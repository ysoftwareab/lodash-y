import _ from 'lodash';

import {
  Fn
} from '../types';

/**
 * Part of `lodash-y`.
 *
 * Create a function that memoizes the result of origFn for a specific TTL time window.
 *
 * @param ttl The number of milliseconds to keep the output memoized.
 * @param origFn The function to have its output memoized.
 * @param resolver The function to resolve the cache key.
 * @returns Returns the new memoizing function.
 */
export let memoizeTtl = _.assign(function<T extends Fn>(
  ttl: number,
  origFn: T,
  resolver?: (...args: Parameters<T>) => string
): T & _.MemoizedFunction {
  let fn = _.assign(function(...args: Parameters<T>): ReturnType<T> {
    let key = _.isUndefined(resolver) ? _.head(args) : resolver(...args);
    let {
      cache
    } = fn;

    if (cache.has(key)) {
      let {
        value,
        expires
      } = cache.get(key);

      if (expires > Date.now()) {
        return value;
      }
    }

    let value = origFn(...args);
    let expires = Date.now() + ttl;
    fn.cache = cache.set(key, {
      value,
      expires
    });

    return value as ReturnType<T>;
  }, {
    cache: new memoizeTtl.Cache()
  });

  // @ts-ignore
  return fn;
}, {
  Cache: Map
});
