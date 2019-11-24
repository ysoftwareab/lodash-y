"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CanonicalIntersectionObserver = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _globalThis = _interopRequireDefault(require("./.global-this"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






class CanonicalIntersectionObserver {








  constructor(cb) {_defineProperty(this, "_cb", undefined);_defineProperty(this, "_cache", []);
    this._cb = cb;
  }

  observe(element, options) {
    let alreadyObserving = _lodash.default.some(this._cache, function (cacheEntry) {
      return cacheEntry.element === element && cacheEntry.options === options;
    });
    if (alreadyObserving) {
      return;
    }

    let cacheEntry = _lodash.default.find(this._cache, function (cacheEntry) {
      return cacheEntry.options === options;
    });
    let observer;
    if (_lodash.default.isUndefined(cacheEntry)) {
      observer = new _globalThis.default.IntersectionObserver(entries => {
        this._cb(entries, this);
      }, options);
    } else {
      ({
        observer } =
      cacheEntry);
    }

    observer.observe(element);
    this._cache.push({
      element,
      options,
      observer });

  }

  unobserve(element, options) {
    let cache = _lodash.default.filter(this._cache, function (cacheEntry) {
      return cacheEntry.element === element && cacheEntry.options === options;
    });

    _lodash.default.forEach(cache, function ({ element, observer }) {
      observer.unobserve(element);
    });

    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.remove(this._cache, function (cacheEntry) {
      return cacheEntry.element === element && cacheEntry.options === options;
    });
  }

  disconnect() {
    let observers = _lodash.default.map(this._cache, function (cacheEntry) {
      return cacheEntry.observer;
    });
    observers = _lodash.default.uniq(observers);
    _lodash.default.forEach(observers, function (observer) {
      observer.disconnect();
    });
    this._cache = [];
  }}exports.CanonicalIntersectionObserver = CanonicalIntersectionObserver;

//# sourceMappingURL=canonical-intersection-observer.js.map