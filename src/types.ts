/**
 * An optional value of type T.
 */
export type Maybe<T = unknown> =
  T | undefined;

/**
 * A value or the Promise of a value of type T.
 */
export type MaybePromise<T = unknown> =
  T | Promise<T>;

// -----------------------------------------------------------------------------
/* Functions */

/**
 * A Function that returns TReturn, with TArgs as arguments.
 */
export type Fn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => TReturn;

/**
 * A Function that returns Promise<TReturn>, with TArgs as arguments.
 */
export type AsyncFn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => Promise<TReturn>;

/**
 * Obtain the type of a Promise resolution.
 */
export type Unpromise<TMaybePromise extends any> =
  TMaybePromise extends Promise<infer TValue>
    ? TValue
    : TMaybePromise

/**
 * Promise<T> or T dependending on whether TFn returns a Promise or not.
 */
export type MaybePromiseReturn<
  T,
  TFn extends Fn
> =
  ReturnType<TFn> extends Promise<any> ? Promise<T> : T;

/**
 * Change the return type of TFn, without changing the arguments.
 */
export type FnChangeReturnType<
  TFn extends Fn,
  TReturn = Unpromise<ReturnType<TFn>>
> =
  ReturnType<TFn> extends Promise<any> ?
    Fn<Promise<TReturn>, Parameters<TFn>> :
    Fn<TReturn, Parameters<TFn>>;

// -----------------------------------------------------------------------------
/* Callbacks */

/**
 * A callback Function.
 */
export type CallbackFn =
  Fn<MaybePromise<void>>;

/**
 * A NodeJS-style callback function that resolves with TResult.
 */
export type NodeJSCallbackFn<TResult = unknown> =
  Fn<MaybePromise<void>, [Error] | [undefined, TResult]>;

/**
 * An error-last-style callback function that resolves with TResult.
 */
export type NodeJSCallbackErrorLastFn<TResult = unknown> =
  Fn<MaybePromise<void>, [TResult] | [undefined, Error]>;
