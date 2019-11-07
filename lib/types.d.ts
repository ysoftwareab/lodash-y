export declare type MaybePromise<T> = T | Promise<T>;
export declare type Fn<TReturn = unknown, TArgs extends unknown[] = unknown[]> = (...args: TArgs) => TReturn;
export declare type AsyncFn<TReturn = unknown, TArgs extends unknown[] = unknown[]> = (...args: TArgs) => Promise<TReturn>;
export declare type Unpromise<TMaybePromise extends any> = TMaybePromise extends Promise<infer TValue> ? TValue : TMaybePromise;
export declare type MaybePromiseReturn<TReturn, T extends Fn> = ReturnType<T> extends Promise<any> ? Promise<TReturn> : TReturn;
export declare type FnChangeReturnType<T extends Fn, TReturn = Unpromise<ReturnType<T>>> = ReturnType<T> extends Promise<any> ? (...args: Parameters<T>) => Promise<TReturn> : (...args: Parameters<T>) => TReturn;
export declare type CallbackFn = Fn<MaybePromise<void>>;
export declare type NodeCallbackFn<TResult = unknown> = Fn<MaybePromise<void>, [Error, TResult]>;
export declare type NodeCallbackErrorLastFn<TResult = unknown> = Fn<MaybePromise<void>, [TResult, Error]>;
