/**
 * @typedef {import("lodash").MemoizedFunction} MemoizedFunction
 */

/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that memoizes the result of origFn for a specific TTL time window.
 *
 * @param {number} ttl The number of milliseconds to keep the output memoized.
 * @param {Function} origFn The function to have its output memoized.
 * @param {Function=} resolver The function to resolve the cache key.
 * @returns {MemoizedFunction} Returns the new memoizing function.
 */
export let memoizeTtl = function(ttl, origFn, resolver) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let fn = function(...args) {
    let key = _.isDefined(resolver) ? resolver(...args) : _.head(args);
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
    }) || cache;

    return value;
  };
  fn.cache = new (memoizeTtl.Cache || Map)();
  return fn;
};

memoizeTtl.Cache = Map;
