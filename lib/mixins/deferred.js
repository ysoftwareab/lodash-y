"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "Deferred", { enumerable: true, get: function () {return _types.Deferred;} });exports.deferred = void 0;var _lodash = _interopRequireDefault(require("lodash"));

var _types = require("../types");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



// deprecated. remove in a major release
// import type from `lodash-firecloud/types` instead




/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
 *
 * Example usage:
 * let d = _.deferred();
 * emitter.on('result', function(result) {d.resolve(result);});
 * emitter.on('error', function(err) {d.reject(err);});
 * return d.promise;.
 *
 * _.deferred can also wrap a Promise,
 * and make it more convenient to read Promise state and resolved/rejected values.
 *
 * @param [promise] A promise to automatically resolve/reject the Deferred object with.
 * @returns Returns the Deferred object.
 */
let deferred = function (promise) {
  let deferred = {
    state: 'pending' };


  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = function (value) {
      deferred.value = value;
      deferred.state = 'resolved';
      resolve(value);
    };

    deferred.reject = function (err) {
      deferred.err = err;
      deferred.state = 'rejected';
      reject(err);
    };
  });

  if (!_lodash.default.isUndefined(promise)) {
    promise.then(deferred.resolve).catch(deferred.reject);
  }

  return deferred;
};exports.deferred = deferred;

//# sourceMappingURL=deferred.js.map