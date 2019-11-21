import {
  Fn
} from '../types';

export interface Deferred<TValue> {

  /**
   * The internal promise.
   */
  promise: Promise<TValue>;

  /**
   * The state of the promise.
   */
  state: 'pending' | 'resolved' | 'rejected';

  /**
   * The resolve callback of the promise.
   */
  resolve: Fn<void, [TValue?]>;

  /**
   * The reject callback of the promise.
   */
  reject: Fn<void, [Error]>;

  /**
   * The value that the promise resolved with.
   */
  value?: TValue;

  /**
   * The error that the promise rejected with.
   */
  err?: Error;
}

/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
 *
 * @returns Returns the Deferred object.
 */
export let deferred = function<TValue = unknown>(): Deferred<TValue> {
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

  return deferred as Deferred<TValue>;
};
