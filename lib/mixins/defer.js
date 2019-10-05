"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.defer = void 0;let defer = function () {
  let deferred = {};

  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};exports.defer = defer;

//# sourceMappingURL=defer.js.map