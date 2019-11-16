"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IntervalObserver = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class IntervalObserver {




  constructor(cb) {_defineProperty(this, "_cb", undefined);_defineProperty(this, "_cache", []);
    this._cb = cb;
  }

  observe({ interval }) {
    let cacheEntry = _lodash.default.find(this._cache, {
      interval });

    let isObserving = !_lodash.default.isUndefined(cacheEntry);
    if (isObserving) {
      return;
    }
    let intervalId = setInterval(() => {
      let entries = [{
        interval }];

      this._cb(entries);
    }, interval);
    this._cache.push({
      interval,
      intervalId });

  }

  unobserve({ interval }) {
    let cacheEntry = _lodash.default.find(this._cache, {
      interval });

    let isObserving = !_lodash.default.isUndefined(cacheEntry);
    if (!isObserving) {
      return;
    }
    clearInterval(cacheEntry.intervalId);
    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.pull(this._cache, cacheEntry);
  }

  disconnect() {
    _lodash.default.forEach(this._cache, ({ interval }) => {
      this.unobserve(interval);
    });
  }}exports.IntervalObserver = IntervalObserver;

//# sourceMappingURL=interval-observer.js.map