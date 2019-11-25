/**
 * Make all nested properties in T optional.
 */
export type PartialDeep<T> = {
  [TKey in keyof T]?: T[TKey] extends (infer TValue)[]
    ? PartialDeep<TValue>[]
    : T[TKey] extends readonly (infer TValue)[]
      ? readonly PartialDeep<TValue>[]
      : PartialDeep<T[TKey]>
};

/**
 * Make all nested properties in T required.
 */
export type RequiredDeep<T> = {
  [TKey in keyof T]-?: T[TKey] extends (infer TValue)[]
    ? RequiredDeep<TValue>[]
    : T[TKey] extends readonly (infer TValue)[]
      ? readonly RequiredDeep<TValue>[]
      : RequiredDeep<T[TKey]>
};

/**
 * Make all nested properties in T readonly.
 */
export type ReadonlyDeep<T> = {
  readonly [TKey in keyof T]: ReadonlyDeep<T[TKey]>
};

/**
 * Make all properties in T mutable (not readonly).
 */
export type Mutable<T> = {
  -readonly [TKey in keyof T]: T[TKey]
};

/**
 * Make all nested properties in T mutable (not readonly).
 */
export type MutableDeep<T> = {
  -readonly [TKey in keyof T]: MutableDeep<T[TKey]>
};
