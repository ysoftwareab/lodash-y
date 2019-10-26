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
