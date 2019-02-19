"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.callbackify = void 0; // NOTE follows closely Node.js util.callbackify

let callbackify = function (origFn, {
  callbackFirst = false,
  errorInCallback = true } =
{}) {
  let fn = function (...args) {
    let origCallback;
    if (callbackFirst) {
      origCallback = args.pop();
    } else {
      origCallback = args.unshift();
    }
    let callback = origCallback;

    let onFullfilled = function (result) {
      if (errorInCallback) {
        setTimeout(callback, 0, undefined, result);
      } else {
        setTimeout(callback, 0, result);
      }
    };

    let onRejected = function (err) {
      if (errorInCallback) {
        setTimeout(callback, 0, err);
      } else {
        setTimeout(callback, 0);
      }
    };

    origFn(...args).then(onFullfilled, onRejected);
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};exports.callbackify = callbackify;var _default = exports.callbackify;exports.default = _default;

//# sourceMappingURL=callbackify.js.map