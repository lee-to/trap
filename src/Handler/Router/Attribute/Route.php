<?php

declare(strict_types=1);

namespace Buggregator\Trap\Handler\Router\Attribute;

use Buggregator\Trap\Handler\Router\Method;

/**
 * @internal
 */
#[\Attribute(\Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
abstract class Route
{
    public function __construct(
        public Method $method,
    ) {
    }
}
