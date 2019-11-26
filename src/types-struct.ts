/**
 * Make all nested properties in T optional.
 */
export type PartialDeep<T> =
  {
    [TKey in keyof T]?: T[TKey] extends (infer TValue)[]
      ? PartialDeep<TValue>[]
      : T[TKey] extends readonly (infer TValue)[]
        ? readonly PartialDeep<TValue>[]
        : PartialDeep<T[TKey]>
  };

/**
 * Make specific properties in T optional.
 */
export type PartialKeys<T, TKeys extends keyof T = keyof T> =
  & Omit<T, TKeys>
  & Partial<Pick<T, TKeys>>;

/**
 * Make all nested properties in T required.
 */
export type RequiredDeep<T> =
  {
    [TKey in keyof T]-?: T[TKey] extends (infer TValue)[]
      ? RequiredDeep<TValue>[]
      : T[TKey] extends readonly (infer TValue)[]
        ? readonly RequiredDeep<TValue>[]
        : RequiredDeep<T[TKey]>
  };

/**
 * Make specific properties in T required.
 */
export type RequiredKeys<T, TKeys extends keyof T = keyof T> =
  & Omit<T, TKeys>
  & Required<Pick<T, TKeys>>;

/**
 * Make all nested properties in T readonly.
 */
export type ReadonlyDeep<T> =
  {
    readonly [TKey in keyof T]: ReadonlyDeep<T[TKey]>
  };

/**
 * Make specific properties in T readonly.
 */
export type ReadonlyKeys<T, TKeys extends keyof T = keyof T> =
  & Omit<T, TKeys>
  & Readonly<Pick<T, TKeys>>;

/**
 * Make all properties in T mutable (not readonly).
 */
export type Mutable<T> =
  {
    -readonly [TKey in keyof T]: T[TKey]
  };

/**
 * Make specific properties in T mutable.
 */
export type MutableKeys<T, TKeys extends keyof T = keyof T> =
  & Omit<T, TKeys>
  & Mutable<Pick<T, TKeys>>;

/**
 * Make all nested properties in T mutable (not readonly).
 */
export type MutableDeep<T> =
  {
    -readonly [TKey in keyof T]: MutableDeep<T[TKey]>
  };
