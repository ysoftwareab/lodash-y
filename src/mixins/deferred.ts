import _ from 'lodash';

import {
  Deferred
} from '../types';

// deprecated. remove in a major release
// import type from `lodash-firecloud/types` instead
export {
  Deferred
} from '../types';

/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
 *
 * @param [promise] A promise to automatically resolve/reject the Deferred object with.
 * @returns Returns the Deferred object.
 */
export let deferred = function<TValue = unknown>(promise?: Promise<any>): Deferred<TValue> {
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
    _.defer(async function() {
      try {
        deferred.resolve(await promise);
      } catch (err) {
        deferred.reject(err);
      }
    });
  }

  return deferred as Deferred<TValue>;
};
