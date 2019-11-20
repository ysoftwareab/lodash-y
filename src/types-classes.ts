/**
 * A class type (i.e. A constructor type).
 */
export type Class<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> = {
  new(...args: TArgs): TReturn;
};

/**
 * Construct a class type with the static properties of TClass except for those in type TKey.
 */
export type OmitClassStatic<
  TClass extends Class,
  TKey extends keyof any
> =
  TClass extends {
    new(...args: infer TArgs): infer TInstance;
  }
    ? (
      & {
        new(...args: TArgs): TInstance;
      }
      & Omit<TClass, TKey>
    )
    : never;

/**
 * Construct a class type with the instance properties of TClass except for those in type TKey.
 */
export type OmitClassInstance<
  TClass extends Class,
  TKey extends keyof any
> =
  TClass extends {
    new(...args: infer TArgs): infer TInstance;
  }
    ? (
      & {
        new(...args: TArgs): Omit<TInstance, TKey>;
      }
      & Omit<TClass, 'prototype'>
      & {
        prototype: Omit<TInstance, TKey>;
      }
    )
    : never;
