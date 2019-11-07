"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.callbackify = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}






// NOTE follows closely Node.js util.callbackify

/**
 * Part of `lodash-firecloud`.
 *
 * Convert Promise into callback-like function.
 *
 * @param origFn Promise to callbackify.
 * @param options Options object.
 * @param [options.callbackFirst=false] Specifies if callback is a first arg.
 * @param [options.errorInCallback=true] Specifies if the first arg of callback is an error.
 * @param [options.keepCallback=false] Specifies if the callback arg should be passed to the Promise.
 * @returns Returns a callback-like function wrapping original `fn`.
 */
let callbackify = function (origFn, options =



{}) {
  _lodash.default.defaults(options, {
    callbackFirst: false,
    errorInCallback: true,
    keepCallback: false });


  let fn = function (...args) {
    let origCallback;
    if (options.callbackFirst) {
      origCallback = _lodash.default.head(args);
      if (!options.keepCallback) {
        args.shift();
      }
    } else {
      origCallback = _lodash.default.last(args);
      if (!options.keepCallback) {
        args.pop();
      }
    }
    let callback = (...args) => {
      // eslint-disable-next-line babel/no-invalid-this
      Reflect.apply(origCallback, this, args);
      // origCallback(...args);
    };

    let onFullfilled = function (result) {
      if (options.errorInCallback) {
        setTimeout(callback, 0, undefined, result);
      } else {
        setTimeout(callback, 0, result);
      }
    };

    let onRejected = function (err) {
      if (options.errorInCallback) {
        setTimeout(callback, 0, err);
      } else {
        setTimeout(callback, 0);
      }
    };

    // eslint-disable-next-line babel/no-invalid-this
    Reflect.apply(origFn, this, args).then(onFullfilled, onRejected);
    // origFn(...args).then(onFullfilled, onRejected);
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};exports.callbackify = callbackify;

//# sourceMappingURL=callbackify.js.map