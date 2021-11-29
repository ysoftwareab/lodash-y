import _ from 'lodash';

import {
  Deferred
} from '../types';

// deprecated. remove in a major release
// import type from `lodash-y/types` instead
export {
  Deferred
} from '../types';

/**
 * Part of `lodash-y`.
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
export let deferred = function<TValue = unknown>(promise?: Promise<TValue>): Deferred<TValue> {
  let deferred: Partial<Deferred<TValue>> = {
    state: 'pending'
  };

  deferred.promise = new Promise(function(resolve, reject) {
    deferred.resolve = function(value) {
      deferred.value = value;
      deferred.state = 'resolved';
      resolve(value);
    };

    deferred.reject = function(err) {
      deferred.err = err;
      deferred.state = 'rejected';
      reject(err);
    };
  });

  if (!_.isUndefined(promise)) {
    promise.then(deferred.resolve).catch(deferred.reject);
  }

  return deferred as Deferred<TValue>;
};
