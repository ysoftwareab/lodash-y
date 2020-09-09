import { Deferred } from '../types';
export { Deferred } from '../types';
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
export declare let deferred: <TValue = unknown>(promise?: Promise<TValue>) => Deferred<TValue>;
