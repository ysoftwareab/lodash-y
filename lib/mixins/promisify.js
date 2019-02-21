"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.promisify = void 0; // NOTE follows closely Node.js util.promisify

let promisify = function (origFn, {
  callbackFirst = false,
  errorInCallback = true } =
{}) {
  let fn = function (...args) {
    return new Promise(function (resolve, reject) {
      let callback = function (...results) {
        if (errorInCallback) {
          let err = results.shift();
          if (err) {
            reject(err);
            return;
          }
        }

        switch (results.length) {
          case 0:
            resolve();
            break;

          case 1:
            resolve(results[0]);
            break;

          default:
            resolve(results);
            break;}

      };

      if (callbackFirst) {
        args.unshift(callback);
      } else {
        args.push(callback);
      }
      origFn(...args);
    });
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};exports.promisify = promisify;var _default = exports.promisify;exports.default = _default;

//# sourceMappingURL=promisify.js.map