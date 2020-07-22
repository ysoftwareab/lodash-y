import * as _UT from 'utility-types';
import { Fn } from './types-functions';
export interface Deferred<TValue> {
    /**
     * The internal promise.
     */
    promise: Promise<TValue>;
    /**
     * The state of the promise.
     */
    state: 'pending' | 'resolved' | 'rejected';
    /**
     * The resolve callback of the promise.
     */
    resolve: Fn<void, [TValue?]>;
    /**
     * The reject callback of the promise.
     */
    reject: Fn<void, [Error]>;
    /**
     * The value that the promise resolved with.
     */
    value?: TValue;
    /**
     * The error that the promise rejected with.
     */
    err?: Error;
}
export interface CallSite {
    /**
     * Value of "this"
     */
    getThis(): any;
    /**
     * Type of "this" as a string.
     * This is the name of the function stored in the constructor field of
     * "this", if available.  Otherwise the object's [[Class]] internal
     * property.
     */
    getTypeName(): string | null;
    /**
     * Current function
     */
    getFunction(): Function | undefined;
    /**
     * Name of the current function, typically its name property.
     * If a name property is not available an attempt will be made to try
     * to infer a name from the function's context.
     */
    getFunctionName(): string | null;
    /**
     * Name of the property [of "this" or one of its prototypes] that holds
     * the current function
     */
    getMethodName(): string | null;
    /**
     * Name of the script [if this function was defined in a script]
     */
    getFileName(): string | null;
    /**
     * Current line number [if this function was defined in a script]
     */
    getLineNumber(): number | null;
    /**
     * Current column number [if this function was defined in a script]
     */
    getColumnNumber(): number | null;
    /**
     * A call site object representing the location where eval was called
     * [if this function was created using a call to eval]
     */
    getEvalOrigin(): string | undefined;
    /**
     * Is this a toplevel invocation, that is, is "this" the global object?
     */
    isToplevel(): boolean;
    /**
     * Does this call take place in code defined by a call to eval?
     */
    isEval(): boolean;
    /**
     * Is this call in native V8 code?
     */
    isNative(): boolean;
    /**
     * Is this a constructor call?
     */
    isConstructor(): boolean;
}
export declare let UT: typeof _UT;
export * from './types-callbacks';
export * from './types-classes';
export * from './types-core';
export * from './types-functions';
export * from './types-json';
export * from './types-struct';
export * from './types-struct-keys';
