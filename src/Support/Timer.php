<?php

declare(strict_types=1);

namespace Buggregator\Client\Support;

use Closure;
use Fiber;
use RuntimeException;

final class Timer
{
    private float $start;
    private bool $stop = false;

    /**
     * @param null|float $beep Seconds
     * @param null|Closure(): bool $condition Condition to stop waiting
     */
    public function __construct(
        public ?float $beep = null,
        public ?Closure $condition = null,
    ) {
        $this->reset();
    }

    /**
     * Wait the timer is ready using {@see Fiber}.
     */
    public function wait(): self
    {
        while (!$this->isReady()) {
            Fiber::suspend();
        }
        return $this;
    }

    public function stop(): self
    {
        $this->stop = true;
        return $this;
    }

    public function isStopped(): bool
    {
        return $this->stop;
    }

    public function reset(): self
    {
        $this->start = \microtime(true);
        $this->stop = false;
        return $this;
    }

    public function isReady(): bool
    {
        return !$this->stop && $this->beep !== null && $this->elapsed() > $this->beep
            or
            $this->condition !== null && ($this->condition)() === true;
    }

    public function elapsed(): float
    {
        return $this->stop ? throw new RuntimeException('Timer stopped.') : \microtime(true) - $this->start;
    }

    /**
     * Reset timer if it's stopped.
     */
    public function continue(): self
    {
        return $this->stop ? $this->reset() : $this;
    }
}
