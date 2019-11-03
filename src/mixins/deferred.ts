/**
 * Deferred definition.
 *
 * @typedef {Object} Deferred
 * @property {Promise} promise The internal promise.
 * @property {Function} resolve The resolve callback of the promise.
 * @property {Function} reject The reject callback of the promise.
 * @property {?} value The value that the promise resolved with.
 * @property {Error} err The error that the promise rejected with.
 */

/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
 *
 * @returns {Deferred} Returns the Deferred object.
 */
export let deferred = function() {
  let deferred = {
    promise: undefined,
    resolve: undefined,
    reject: undefined,

    value: undefined,
    err: undefined
  };

  deferred.promise = new Promise(function(resolve, reject) {
    deferred.resolve = function(value) {
      deferred.value = value;
      resolve(value);
    };

    deferred.reject = function(err) {
      deferred.err = err;
      reject(err);
    };
  });

  return deferred;
};
