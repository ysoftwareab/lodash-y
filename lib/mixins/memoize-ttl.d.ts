import { Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that memoizes the result of origFn for a specific TTL time window.
 *
 * @param ttl The number of milliseconds to keep the output memoized.
 * @param origFn The function to have its output memoized.
 * @param resolver The function to resolve the cache key.
 * @returns Returns the new memoizing function.
 */
export declare let memoizeTtl: (<T extends Fn<unknown, unknown[]>>(ttl: number, origFn: T, resolver?: (...args: Parameters<T>) => string) => T) & {
    Cache: MapConstructor;
};
