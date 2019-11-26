import { IfEquals } from './types-core';
/**
 * ONLY FOR CONSISTENCY!
 * USE 'keyof T' INSTEAD OF 'Keys<T>'!
 *
 * Get the keys of T.
 */
export declare type Keys<T> = keyof T;
/**
 * Get the partial (optional) keys of T.
 */
export declare type KeysPartial<T> = {
    [TKey in keyof T]?: {} extends Pick<T, TKey> ? never : TKey;
}[keyof T];
/**
 * Get the required keys of T.
 */
export declare type KeysRequired<T> = {
    [TKey in keyof T]-?: {} extends Pick<T, TKey> ? never : TKey;
}[keyof T];
/**
 * Get the readonly keys of T.
 */
export declare type KeysReadonly<T> = {
    [TKey in keyof T]-?: IfEquals<{
        [TKey2 in TKey]: T[TKey];
    }, {
        readonly [TKey2 in TKey]: T[TKey];
    }, TKey>;
}[keyof T];
/**
 * Get the mutable keys of T.
 */
export declare type KeysMutable<T> = {
    [TKey in keyof T]-?: IfEquals<{
        [TKey2 in TKey]: T[TKey];
    }, {
        -readonly [TKey2 in TKey]: T[TKey];
    }, TKey>;
}[keyof T];
