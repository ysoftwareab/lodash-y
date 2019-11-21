import { MaybePromise } from './types-core';
import { Fn } from './types-functions';
/**
 * A callback Function.
 */
export declare type CallbackFn = Fn<MaybePromise<void>>;
/**
 * A NodeJS-style callback function that resolves with TResult.
 */
export declare type NodeJSCallbackFn<TResult = unknown> = Fn<MaybePromise<void>, [Error] | [undefined, TResult]>;
/**
 * An error-last-style callback function that resolves with TResult.
 */
export declare type NodeJSCallbackErrorLastFn<TResult = unknown> = Fn<MaybePromise<void>, [TResult] | [undefined, Error]>;
