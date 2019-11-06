"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.memoizeTtl = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





/**
                                                                                                                                                                                                                                                              * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                              * Create a function that memoizes the result of origFn for a specific TTL time window.
                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                              * @param ttl The number of milliseconds to keep the output memoized.
                                                                                                                                                                                                                                                              * @param origFn The function to have its output memoized.
                                                                                                                                                                                                                                                              * @param resolver The function to resolve the cache key.
                                                                                                                                                                                                                                                              * @returns Returns the new memoizing function.
                                                                                                                                                                                                                                                              */
let memoizeTtl = _lodash.default.assign(function (
ttl,
origFn,
resolver)
{
  let fn = _lodash.default.assign(function (...args) {
    let key = _lodash.default.isUndefined(resolver) ? _lodash.default.head(args) : resolver(...args);
    let {
      cache } =
    fn;

    if (cache.has(key)) {
      let {
        value,
        expires } =
      cache.get(key);

      if (expires > Date.now()) {
        return value;
      }
    }

    let value = origFn(...args);
    let expires = Date.now() + ttl;
    fn.cache = cache.set(key, {
      value,
      expires });


    return value;
  }, {
    cache: new memoizeTtl.Cache() });


  // @ts-ignore
  return fn;
}, {
  Cache: Map });exports.memoizeTtl = memoizeTtl;

//# sourceMappingURL=memoize-ttl.js.map