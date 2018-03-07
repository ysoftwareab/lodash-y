"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let promisify = exports.promisify = function (origFn, {
  callbackFirst = false,
  errorInCallback = true
} = {}) {
  return function (...args) {
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
            break;
        }
      };

      if (callbackFirst) {
        args.unshift(callback);
      } else {
        args.push(callback);
      }
      origFn(...args);
    });
  };
};

exports.default = promisify;

//# sourceMappingURL=promisify.js.map