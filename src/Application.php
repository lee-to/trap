<?php

declare(strict_types=1);

namespace Buggregator\Trap;

use Buggregator\Trap\Config\SocketServer;
use Buggregator\Trap\Handler\Http\Handler\Websocket;
use Buggregator\Trap\Handler\Http\Middleware;
use Buggregator\Trap\Proto\Buffer;
use Buggregator\Trap\Socket\Client;
use Buggregator\Trap\Socket\Server;
use Buggregator\Trap\Socket\SocketStream;
use Buggregator\Trap\Support\Timer;
use Buggregator\Trap\Traffic\Inspector;
use Fiber;

/**
 * @internal
 */
final class Application implements Processable
{
    /** @var Processable[] */
    private array $processors = [];

    /** @var Server[] */
    private array $servers = [];

    /** @var Fiber[] Any tasks in fibers */
    private array $fibers = [];

    private readonly Buffer $buffer;

    /**
     * @param SocketServer[] $map
     * @param Sender[] $senders
     */
    public function __construct(
        array $map = [],
        private readonly Logger $logger = new Logger(),
        private array $senders = [],
        bool $configureUI = true,
    ) {
        $this->buffer = new Buffer(bufferSize: 10485760, timer: 0.1);

        $inspector = new Inspector(
            $this->buffer,
            $this->logger,
            // new Traffic\Dispatcher\WebSocket(),
            new Traffic\Dispatcher\VarDumper(),
            new Traffic\Dispatcher\Http(
                [
                    new Middleware\Resources(),
                    new Middleware\DebugPage(),
                    new Middleware\RayRequestDump(),
                    new Middleware\SentryTrap(),
                ],
                [new Websocket()],
            ),
            new Traffic\Dispatcher\Smtp(),
            new Traffic\Dispatcher\Monolog(),
        );
        $this->processors[] = $inspector;

        $configureUI and $this->configureUI(8000);

        foreach ($map as $config) {
            $this->prepareServerFiber($config, $inspector, $this->logger);
        }
    }

    /**
     * @param positive-int $sleep Sleep time in microseconds
     */
    public function run(int $sleep = 50): void
    {
        foreach ($this->senders as $sender) {
            \assert($sender instanceof Sender);
            if ($sender instanceof Processable) {
                $this->processors[] = $sender;
            }
        }

        while (true) {
            $this->process($this->senders);
            \usleep($sleep);
        }
    }

    /**
     * @param Sender[] $senders
     */
    public function process(array $senders = []): void
    {
        foreach ($this->processors as $server) {
            $server->process();
        }

        // Process buffer
        if ($this->buffer->isReady()) {
            $this->sendBuffer($senders);
        }

        foreach ($this->fibers as $key => $fiber) {
            try {
                $fiber->isStarted() ? $fiber->resume() : $fiber->start();

                if ($fiber->isTerminated()) {
                    unset($this->fibers[$key]);
                }
            } catch (\Throwable $e) {
                $this->logger->exception($e);
                unset($this->fibers[$key]);
            }
        }
    }

    /**
     * @param Sender[] $senders
     */
    private function sendBuffer(array $senders = []): void
    {
        $data = $this->buffer->getAndClean();

        foreach ($senders as $sender) {
            $this->fibers[] = new Fiber(
                static fn() => $sender->send($data)
            );
        }
    }

    private function createServer(SocketServer $config, Inspector $inspector): Server
    {
        $clientInflector = static function (Client $client, int $id) use ($inspector): Client {
            // Logger::debug('New client connected %d', $id);
            $inspector->addStream(SocketStream::create($client, $id));
            return $client;
        };

        return Server::init(
            $config->port,
            payloadSize: 524_288,
            clientInflector: $clientInflector,
            logger: $this->logger,
        );
    }

    /**
     * @param SocketServer $config
     * @param Inspector $inspector
     * @return Fiber
     */
    public function prepareServerFiber(SocketServer $config, Inspector $inspector, Logger $logger): Fiber
    {
        return $this->fibers[] = new Fiber(function () use ($config, $inspector, $logger) {
            do {
                try {
                    $this->processors[] = $this->servers[$config->port] = $this->createServer($config, $inspector);
                    return;
                } catch (\Throwable) {
                    $logger->error("Can't create TCP socket on port $config->port.");
                    (new Timer(1.0))->wait();
                }
            } while (true);
        });
    }

    public function configureUI(int $port): void
    {
        $this->senders[] = $wsSender = Sender\WebsocketSender::create($this->logger);

        $inspector = new Inspector(
            $this->buffer,
            $this->logger,
            new Traffic\Dispatcher\Http(
                [
                    new Sender\Websocket\Http\StaticFiles(),
                    new Sender\Websocket\Http\Events($wsSender->getEventStorage()),
                    new Sender\Websocket\Http\Version(),
                ],
                [new Sender\Websocket\Http\RequestHandler($wsSender->getConnectionPool())],
                silentMode: true,
            ),
        );
        $this->processors[] = $inspector;

        $this->processors[] = $wsSender;
        $this->prepareServerFiber(new SocketServer(port: $port), $inspector, $this->logger);
    }
}
