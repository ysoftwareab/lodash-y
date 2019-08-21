export let memoizeTtl = function(ttl, func, resolver) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let memoized = function(...args) {
    let key = _.isDefined(resolver) ? resolver(...args) : _.head(args);
    let {
      cache
    } = memoized;

    if (cache.has(key)) {
      let {
        value,
        expires
      } = cache.get(key);

      if (expires > Date.now()) {
        return value;
      }
    }

    let value = func(...args);
    let expires = Date.now() + ttl;
    memoized.cache = cache.set(key, {
      value,
      expires
    }) || cache;

    return value;
  };
  memoized.cache = new (memoizeTtl.Cache || Map)();
  return memoized;
};

memoizeTtl.Cache = Map;
