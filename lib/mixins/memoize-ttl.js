"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.memoizeTtl = void 0;let memoizeTtl = function (ttl, fn, resolver) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let memoized = function (...args) {
    let key = _.isDefined(resolver) ? resolver(...args) : _.head(args);
    let {
      cache } =
    memoized;

    if (cache.has(key)) {
      let {
        value,
        expires } =
      cache.get(key);

      if (expires > Date.now()) {
        return value;
      }
    }

    let value = fn(...args);
    let expires = Date.now() + ttl;
    memoized.cache = cache.set(key, {
      value,
      expires }) ||
    cache;

    return value;
  };
  memoized.cache = new (memoizeTtl.Cache || Map)();
  return memoized;
};exports.memoizeTtl = memoizeTtl;

exports.memoizeTtl.Cache = Map;

//# sourceMappingURL=memoize-ttl.js.map