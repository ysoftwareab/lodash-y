import { AsyncFn, Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Convert callback-like function into Promise.
 *
 * @param origFn Callback-based function to promisify.
 * @param options Options.
 * @param [options.callbackFirst=false] Specifies if the callback is the first argument to origFn.
 * @param [options.errorInCallback=true] Specifies if error is the first argument to the callback.
 * @returns Returns an async function wrapping the original function.
 */
export declare let promisify: (origFn: Fn, options?: {
    callbackFirst?: boolean;
    errorInCallback?: boolean;
}) => AsyncFn;
