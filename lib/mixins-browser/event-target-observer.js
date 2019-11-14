"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.EventTargetObserver = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class EventTargetObserver {




  constructor(cb) {_defineProperty(this, "_cb", undefined);_defineProperty(this, "_cache", []);
    this._cb = cb;
  }

  observe(
  args,



  options = {})
  {
    let {
      target,
      type } =
    args;
    let cacheEntry = _lodash.default.find(this._cache, {
      target,
      type,
      capture: options.capture });

    let isObserving = !_lodash.default.isUndefined(cacheEntry);
    if (isObserving) {
      return;
    }
    let listener = e => {
      let entries = [
      e];

      this._cb(entries);
    };
    this._cache.push({
      target,
      type,
      capture: options.capture });

    target.addEventListener(type, listener, options);
  }

  unobserve(
  args,



  options = {})
  {
    let {
      target,
      type } =
    args;
    let cacheEntry = _lodash.default.find(this._cache, {
      target,
      type,
      capture: options.capture });

    let isObserving = !_lodash.default.isUndefined(cacheEntry);
    if (!isObserving) {
      return;
    }
    target.removeEventListener(type, cacheEntry.listener, options);
    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.pull(this._cache, cacheEntry);
  }

  disconnect() {
    _lodash.default.forEach(this._cache, ({
      target,
      type,
      capture }) =>
    {
      this.unobserve({
        type,
        target },
      {
        capture });

    });
  }}exports.EventTargetObserver = EventTargetObserver;

//# sourceMappingURL=event-target-observer.js.map