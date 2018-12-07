"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// "true throttle"
// custom implementation of _.throttle with 'trailing': false,
// does not allocate unnecessary timer, comparing to lodash func (which invokes debounce under the hood)
let onceIn = exports.onceIn = function (fn, interval) {
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
};

exports.default = exports.onceIn;

//# sourceMappingURL=once-in.js.map