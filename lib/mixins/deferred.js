"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deferred = void 0;































/**
                                                                                                       * Part of `lodash-firecloud`.
                                                                                                       *
                                                                                                       * Create a Deferred object that references the promise, the resolve and reject functions.
                                                                                                       *
                                                                                                       * @returns Returns the Deferred object.
                                                                                                       */
let deferred = function () {
  let deferred = {};

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