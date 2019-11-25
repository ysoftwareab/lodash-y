import { Fn, FnChangeReturnType, PromiseType } from '../types';
export declare class LimitInParallelError extends Error {
}
export interface LimitInParallelOptions {
    limit?: number;
    throwErr?: boolean;
}
/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that can only run maximum n times in parallel.
 *
 * @param origFn The function to have its parallelism limited.
 * @param options The options.
 * @param [options.limit=1] Specifies the maximum number of parallel executions.
 * @param [options.throwErr=false] Specifies whether to throw an error when the limit has been reached.
 * @returns Returns the new limited function.
 */
export declare let limitInParallel: <T extends Fn<unknown, unknown[]>>(origFn: T, options?: {
    limit?: number;
    throwErr?: boolean;
}) => FnChangeReturnType<T, LimitInParallelError | PromiseType<ReturnType<T>>>;
