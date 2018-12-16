"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.onceIn = void 0; // "true throttle"
// custom implementation of _.throttle with 'trailing': false,
// does not allocate unnecessary timer, comparing to lodash func (which invokes debounce under the hood)
let onceIn = function (fn, interval) {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = function (...args) {
    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = fn(...args);
    return lastInvokeResult;
  };

  // special case for direct call
  if (interval === 0) {
    toInvoke = function (...args) {
      return fn(...args);
    };
  }

  // _.throttle consistency
  toInvoke.flush = function () {
    lastInvokeTime = 0;
  };
  toInvoke.clear = toInvoke.flush;

  return toInvoke;
};exports.onceIn = onceIn;var _default = exports.onceIn;exports.default = _default;

//# sourceMappingURL=once-in.js.map