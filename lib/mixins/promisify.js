"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.promisify = void 0;var _lodash = _interopRequireDefault(require("lodash"));

var _deferred = require("./deferred");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}









// NOTE follows closely Node.js util.promisify

/**
 * Part of `lodash-firecloud`.
 *
 * Convert callback-like function into Promise.
 *
 * @param origFn Callback-based function to promisify.
 * @param options Options.
 * @param [options.callbackFirst=false] Specifies if the callback is the first argument to origFn.
 * @param [options.errorInCallback=true] Specifies if error is the first argument to the callback.
 * @returns Returns an async function wrapping the original function.
 */
let promisify = function (origFn, options =


{}) {
  _lodash.default.defaults(options, {
    callbackFirst: false,
    errorInCallback: true });


  let fn = async function (...args) {
    let d = (0, _deferred.deferred)();

    let callback = function (...results) {
      if (options.errorInCallback) {
        let err = results.shift();
        if (!_lodash.default.isUndefined(err)) {
          d.reject(err);
          return;
        }
      }

      switch (results.length) {
        case 0:
          d.resolve();
          break;

        case 1:
          d.resolve(results[0]);
          break;

        default:
          d.resolve(results);
          break;}

    };

    if (options.callbackFirst) {
      args.unshift(callback);
    } else {
      args.push(callback);
    }
    origFn(...args);

    return d.promise;
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};exports.promisify = promisify;

//# sourceMappingURL=promisify.js.map