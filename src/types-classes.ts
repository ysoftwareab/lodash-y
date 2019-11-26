/**
 * A class type (i.e. A constructor type).
 */
export type Constructor<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  {
    new(...args: TArgs): TReturn;
  };

/**
 * Construct a class type with the static properties of TConstructor except for those in type TKeys.
 */
export type ConstructorOmit<
  TConstructor extends Constructor,
  TKeys extends keyof any
> =
  TConstructor extends {
    new(...args: infer TArgs): infer TInstance;
  }
    ? (
      & {
        new(...args: TArgs): TInstance;
      }
      & Omit<TConstructor, TKeys>
    )
    : never;

/**
 * Construct a class type with the instance of type TInstance.
 */
export type InstanceReplace<
  TConstructor extends Constructor,
  TInstance
> =
  TConstructor extends {
    new(...args: infer TArgs): any;
  }
    ? (
      & {
        prototype: TInstance;
        new(...args: TArgs): TInstance;
      }
      & Omit<TConstructor, 'prototype'> // the constructor function 'new' is omitted by default
    )
    : never;

/**
 * Construct a class type with the instance properties of TConstructor except for those in type TKeys.
 */
export type InstanceOmit<
  TConstructor extends Constructor,
  TKeys extends keyof InstanceType<TConstructor>
> =
  InstanceReplace<
  TConstructor,
  Omit<InstanceType<TConstructor>, TKeys>
  >;
