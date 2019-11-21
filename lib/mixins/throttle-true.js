"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.throttleTrue = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





/**
                                                                                                                                                                                                                                                                * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                * A "true" _.throttle with 'trailing': false".
                                                                                                                                                                                                                                                                * A lightweight version which does not allocate unnecessary timer,
                                                                                                                                                                                                                                                                * comparing to the original _.throttle (which invokes _.debounce under the hood).
                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                * @param origFn Function to throttle.
                                                                                                                                                                                                                                                                * @param interval Throttling interval.
                                                                                                                                                                                                                                                                * @returns The throttled function.
                                                                                                                                                                                                                                                                */
let throttleTrue = function (origFn, interval) {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = _lodash.default.assign(function (...args) {
    // special case for direct call
    if (interval === 0) {
      return origFn(...args);
    }

    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = origFn(...args);
    return lastInvokeResult;
  }, {
    flush: function () {
      lastInvokeTime = 0;
    },
    cancel: function () {
      lastInvokeTime = 0;
    } });


  return toInvoke;
};exports.throttleTrue = throttleTrue;

//# sourceMappingURL=throttle-true.js.map