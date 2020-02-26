import * as _mixins from './mixins';
import __ from 'lodash';
declare module 'lodash' {
    interface LoDashStatic {
        defer(func: Parameters<typeof setTimeout>[0], ...args: any[]): number;
    }
}
export declare type FirecloudLoDashStatic = __.LoDashStatic & typeof _mixins;
export declare let mixins: {
    abstract: (name?: string) => import("./types-functions").Fn<never, unknown[]>;
    asyncCb: <T extends import("./types-functions").AsyncFn<void, unknown[]>>(cb: T) => import("./types-functions").Fn<void, Parameters<T>>;
    base64: (string: string) => string;
    callbackify: (origFn: import("./types-functions").AsyncFn<unknown, unknown[]>, options?: {
        callbackFirst?: boolean;
        errorInCallback?: boolean;
        keepCallback?: boolean;
    }) => import("./types-functions").Fn<import("./types-core").MaybePromise<void>, unknown[]>;
    consoleLogTime: <TReturn extends unknown>(label: string, fn: () => TReturn) => Promise<TReturn>;
    deferred: <TValue = unknown>(promise?: Promise<any>) => _mixins.Deferred<TValue>;
    getStackTrace: (level?: number) => import("./types").CallSite[];
    hardRejection: {
        (log?: (stack?: string) => void): void;
        default: any;
    };
    isAsyncFunction: (value: unknown) => boolean;
    isDefined: (value: unknown) => boolean;
    LimitInParallelError: typeof _mixins.LimitInParallelError;
    limitInParallel: <T_1 extends import("./types-functions").Fn<unknown, unknown[]>>(origFn: T_1, options?: {
        limit?: number;
        throwErr?: boolean;
    }) => import("./types-functions").FnChangeReturnType<T_1, _mixins.LimitInParallelError | import("./types-core").PromiseType<ReturnType<T_1>>>;
    mapValuesDeep: (origFn: import("./types-functions").Fn<unknown, unknown[]>) => import("./types-functions").Fn<unknown, unknown[]>;
    memoizeTtl: (<T_2 extends import("./types-functions").Fn<unknown, unknown[]>>(ttl: number, origFn: T_2, resolver?: (...args: Parameters<T_2>) => string) => T_2 & __.MemoizedFunction) & {
        Cache: MapConstructor;
    };
    mergeConcatArrays: (object: any, ...sources: any[]) => unknown;
    mergeWithoutArrays: (object: any, ...sources: any[]) => unknown;
    naiveChecksum: (string: string) => string;
    onceIn: <T_3 extends import("./types-functions").Fn<unknown, unknown[]>>(origFn: T_3, interval: number) => T_3 & __.Cancelable;
    outdent: import("outdent").Outdent;
    promisify: (origFn: import("./types-functions").Fn<unknown, unknown[]>, options?: {
        callbackFirst?: boolean;
        errorInCallback?: boolean;
    }) => import("./types-functions").AsyncFn<unknown, unknown[]>;
    safeProxy: (env: __.Dictionary<unknown>) => __.Dictionary<unknown>;
    sleep: (ms?: number) => Promise<void>;
    throttleExp: <T_4 extends import("./types-functions").Fn<unknown, unknown[]>>(origFn: T_4, wait: number, options?: {
        leading?: boolean;
        trailing?: boolean;
        multiplier?: number;
        divider?: number;
        maxWait?: number;
    }) => T_4 & __.Cancelable;
    throttleTrue: <T_3 extends import("./types-functions").Fn<unknown, unknown[]>>(origFn: T_3, interval: number) => T_3 & __.Cancelable;
    unbase64: (string: string) => string;
};
export declare let _: FirecloudLoDashStatic;
export default _;
