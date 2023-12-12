<?php

declare(strict_types=1);

namespace Buggregator\Trap\Handler\Router;

use Buggregator\Trap\Handler\Router\Attribute\Route as RouteAttribute;

/**
 * @internal
 */
final class Router
{
    /** @var array<class-string, self> */
    static private array $cache = [];

    /** @var null|object Null for routes defined in static methods */
    private ?object $object = null;

    /**
     * @param array<non-empty-string, list<RouteDto>> $routes Indexed by {@see Method}: Method => RouteDto[]
     */
    private function __construct(
        private readonly array $routes,
    ) {
    }

    /**
     * @throws \Exception
     */
    public static function new(string|object $classOrObject): self
    {
        return is_object($classOrObject)
            ? self::newStatic($classOrObject::class)->withObject($classOrObject)
            : self::newStatic($classOrObject);
    }

    private function withObject(object $object): self
    {
        $new = clone $this;
        $new->object = $object;
        return $new;
    }

    /**
     * @param class-string $class
     *
     * @throws \Exception
     */
    private static function newStatic(string $class): self
    {
        if (isset(self::$cache[$class])) {
            return self::$cache[$class];
        }

        $routes = self::collectRoutes($class);

        if (empty($routes)) {
            throw new \LogicException(\sprintf(
                'Class `%s` has no routes. Use `#[%s]` family of attributes to define routes.',
                $class,
                RouteAttribute::class,
            ));
        }

        // Prepare an indexed array of routes
        $index = \array_fill_keys(\array_column(Method::cases(), 'value'), []);
        foreach ($routes as $route) {
            $index[$route->route->method->value][] = $route;
        }

        return self::$cache[$class] = new self(
            routes: $index,
        );
    }

    /**
     * @param class-string $class
     *
     * @return list<RouteDto>
     *
     * @throws \ReflectionException
     */
    private static function collectRoutes(string $class): array
    {
        /** @var RouteAttribute[] $result */
        $result = [];

        // Find all public methods with #[Route] attribute
        foreach ((new \ReflectionClass($class))->getMethods(\ReflectionMethod::IS_PUBLIC) as $method) {
            if (empty($attrs = $method->getAttributes(RouteAttribute::class, \ReflectionAttribute::IS_INSTANCEOF))) {
                continue;
            }

            foreach ($attrs as $attr) {
                $result[] = new RouteDto(
                    method: $method,
                    route: $attr->newInstance(),
                );
            }
        }

        return $result;
    }

    /**
     * @param null|object $object Null for static methods
     *
     * @return null|callable(mixed...): mixed Returns null if no route matches
     *
     * @throws \Exception
     */
    public function match(Method $method, string $path): ?callable
    {
        foreach ($this->routes[$method->value] as $route) {
            $match = match ($route->route::class) {
                Attribute\StaticRoute::class => $path === $route->route->path,
                Attribute\RegexpRoute::class => \preg_match($route->route->regexp, $path, $matches) === 1
                    ? \array_filter($matches, '\is_string', \ARRAY_FILTER_USE_KEY)
                    : false,
                default => throw new \LogicException(\sprintf(
                    'Route type `%s` is not supported.',
                    $route::class,
                )),
            };

            if ($match === false) {
                continue;
            }

            // Prepare callable
            $object = $this->object;
            return match(true) {
                \is_callable($match) => $match,
                default => static fn(mixed ...$args): mixed => self::invoke(
                    $route->method,
                    $object,
                    \array_merge($args, \is_iterable($match) ? $match : []),
                )
            };
        }

        return null;
    }

    private static function invoke(\ReflectionMethod $method, ?object $object, array $args): mixed
    {
        // Filter args
        $filteredArgs = [];
        foreach ($method->getParameters() as $param) {
            $name = $param->getName();
            if (isset($args[$name])) {
                $filteredArgs[$name] = $args[$name];
            }
        }

        return $method->invokeArgs($method->isStatic() ? null : $object, $filteredArgs);
    }
}
