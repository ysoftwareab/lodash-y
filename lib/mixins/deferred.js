"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "Deferred", { enumerable: true, get: function () {return _types.Deferred;} });exports.deferred = void 0;var _lodash = _interopRequireDefault(require("lodash"));

var _types = require("../types");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



// deprecated. remove in a major release
// import type from `lodash-firecloud/types` instead




/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
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
    _lodash.default.defer(async function () {
      try {
        deferred.resolve(await (async createError => {try {return await promise;} catch (_awaitTraceErr) {let err = createError();_awaitTraceErr.stack += "\n...\n" + err.stack;throw _awaitTraceErr;}})(() => new Error()));
      } catch (err) {
        deferred.reject(err);
      }
    });
  }

  return deferred;
};exports.deferred = deferred;

//# sourceMappingURL=deferred.js.map