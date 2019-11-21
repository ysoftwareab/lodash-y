/**
 * A class type (i.e. A constructor type).
 */
export type Constructor<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> = {
  new(...args: TArgs): TReturn;
};

/**
 * Construct a class type with the static properties of TConstructor except for those in type TKey.
 */
export type ConstructorOmit<
  TConstructor extends Constructor,
  TKey extends keyof any
> =
  TConstructor extends {
    new(...args: infer TArgs): infer TInstance;
  }
    ? (
      & {
        new(...args: TArgs): TInstance;
      }
      & Omit<TConstructor, TKey>
    )
    : never;

/**
 * Construct a class type with the instance properties of TConstructor except for those in type TKey.
 */
export type InstanceOmit<
  TConstructor extends Constructor,
  TKey extends keyof any
> =
  TConstructor extends {
    new(...args: infer TArgs): infer TInstance;
  }
    ? (
      & {
        new(...args: TArgs): Omit<TInstance, TKey>;
      }
      & Omit<TConstructor, 'prototype'>
      & {
        prototype: Omit<TInstance, TKey>;
      }
    )
    : never;
