export type MaybePromise<T> =
  T | Promise<T>;

/* Functions */

export type Fn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => TReturn;

export type AsyncFn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => Promise<TReturn>;

export type Unpromise<TMaybePromise extends any> =
  TMaybePromise extends Promise<infer TValue>
  ? TValue
  : TMaybePromise

export type MaybePromiseReturn<
  TReturn,
  T extends Fn
> =
  ReturnType<T> extends Promise<any> ? Promise<TReturn> : TReturn;

export type FnChangeReturnType<
  T extends Fn,
  TReturn = Unpromise<ReturnType<T>>
> =
  ReturnType<T> extends Promise<any> ?
  (...args: Parameters<T>) => Promise<TReturn> :
  (...args: Parameters<T>) => TReturn;

/* Callbacks */

export type CallbackFn =
  Fn<MaybePromise<void>>;

export type NodeCallbackFn<TResult = unknown> =
  Fn<MaybePromise<void>, [Error, TResult]>;

export type NodeCallbackErrorLastFn<TResult = unknown> =
  Fn<MaybePromise<void>, [TResult, Error]>;
