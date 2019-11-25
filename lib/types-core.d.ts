/**
 * An optional value of type T.
 */
export declare type Maybe<T = unknown> = T | undefined;
/**
 * A value or the Promise of a value of type T.
 */
export declare type MaybePromise<T = unknown> = T | Promise<T>;
/**
 * A primitive value as per https://developer.mozilla.org/en-US/docs/Glossary/Primitive .
 */
export declare type Primitive = string | number | bigint | boolean | null | undefined | symbol;
/**
 * Expand one-level-only of a type (e.g. Class) for debugging purposes.
 */
export declare type Expand<T> = T extends infer TInferred ? {
    [TKey in keyof TInferred]: TInferred[TKey];
} : never;
/**
 * Expand all-levels of a type (e.g. Class) for debugging purposes.
 */
export declare type ExpandDeep<T> = T extends infer TInferred ? {
    [TKey in keyof TInferred]: ExpandDeep<TInferred[TKey]>;
} : never;
/**
 * Obtain the type of a Promise resolution.
 */
export declare type PromiseType<TMaybePromise extends any> = TMaybePromise extends Promise<infer TValue> ? TValue : TMaybePromise;
/**
 * Make all nested properties in T optional.
 */
export declare type PartialDeep<T> = {
    [TKey in keyof T]?: T[TKey] extends (infer TValue)[] ? PartialDeep<TValue>[] : T[TKey] extends readonly (infer TValue)[] ? readonly PartialDeep<TValue>[] : PartialDeep<T[TKey]>;
};
/**
 * Make all nested properties in T required.
 */
export declare type RequiredDeep<T> = {
    [TKey in keyof T]-?: T[TKey] extends (infer TValue)[] ? RequiredDeep<TValue>[] : T[TKey] extends readonly (infer TValue)[] ? readonly RequiredDeep<TValue>[] : RequiredDeep<T[TKey]>;
};
/**
 * Make all nested properties in T readonly.
 */
export declare type ReadonlyDeep<T> = {
    readonly [TKey in keyof T]: ReadonlyDeep<T[TKey]>;
};
/**
 * Make all properties in T mutable (not readonly).
 */
export declare type Mutable<T> = {
    -readonly [TKey in keyof T]: T[TKey];
};
/**
 * Make all nested properties in T mutable (not readonly).
 */
export declare type MutableDeep<T> = {
    -readonly [TKey in keyof T]: MutableDeep<T[TKey]>;
};
