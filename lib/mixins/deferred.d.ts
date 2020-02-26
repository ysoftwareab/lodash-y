import { Deferred } from '../types';
export { Deferred } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Create a Deferred object that references the promise, the resolve and reject functions.
 *
 * @param [promise] A promise to automatically resolve/reject the Deferred object with.
 * @returns Returns the Deferred object.
 */
export declare let deferred: <TValue = unknown>(promise?: Promise<any>) => Deferred<TValue>;
