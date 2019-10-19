"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deferred = void 0;let deferred = function () {
  let deferred = {
    promise: undefined,
    resolve: undefined,
    reject: undefined,

    value: undefined,
    err: undefined };


  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = function (value) {
      deferred.value = value;
      resolve(value);
    };

    deferred.reject = function (err) {
      deferred.err = err;
      reject(err);
    };
  });

  return deferred;
};exports.deferred = deferred;

//# sourceMappingURL=deferred.js.map