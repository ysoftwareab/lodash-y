import {
  Fn
} from '../types';

export interface Deferred<TValue> {

  /**
   * The internal promise.
   */
  promise: Promise<TValue>;

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
  let deferred: Partial<Deferred<TValue>> = {};

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

  return deferred as Deferred<TValue>;
};
