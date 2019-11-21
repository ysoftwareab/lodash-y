"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CanonicalIntersectionObserver = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _globalThis = _interopRequireDefault(require("./.global-this"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class CanonicalIntersectionObserver {








  constructor(cb) {_defineProperty(this, "_cb", undefined);_defineProperty(this, "_observerPairs", []);
    this._cb = cb;
  }

  observe(element, options) {
    let alreadyObserving = _lodash.default.some(this._observerPairs, function (observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });
    if (alreadyObserving) {
      return;
    }

    let observerPair = _lodash.default.find(this._observerPairs, function (observerPair) {
      return observerPair.options === options;
    });
    let observer;
    if (_lodash.default.isUndefined(observerPair)) {
      observer = new _globalThis.default.IntersectionObserver(entries => {
        this._cb(entries, this);
      }, options);
    } else {
      ({
        observer } =
      observerPair);
    }

    observer.observe(element);
    this._observerPairs.push({
      element,
      options,
      observer });

  }

  unobserve(element, options) {
    let observerPairs = _lodash.default.filter(this._observerPairs, function (observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });

    _lodash.default.forEach(observerPairs, function ({ element, observer }) {
      observer.unobserve(element);
    });

    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.remove(this._observerPairs, function (observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });
  }

  disconnect() {
    let observers = _lodash.default.map(this._observerPairs, function (observerPair) {
      return observerPair.observer;
    });
    observers = _lodash.default.uniq(observers);
    _lodash.default.forEach(observers, function (observer) {
      observer.disconnect();
    });
    this._observerPairs = [];
  }}exports.CanonicalIntersectionObserver = CanonicalIntersectionObserver;

//# sourceMappingURL=canonical-intersection-observer.js.map