import * as _UT from 'utility-types';
import { Fn } from './types-functions';
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
export declare let UT: typeof _UT;
export * from './types-callbacks';
export * from './types-classes';
export * from './types-core';
export * from './types-functions';
export * from './types-json';
export * from './types-struct';
export * from './types-struct-keys';
