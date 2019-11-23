/// <reference types="node" />
export interface V8OpenHandle {
    time: number;
    asyncId: number;
    triggerAsyncId: number;
    resource: object;
    executionAsyncId: number;
    stackTrace: NodeJS.CallSite[];
}
/**
 * Part of `lodash-firecloud`.
 *
 * Gets info about the V8 open handles.
 *
 * @param options Options.
 * @param [options.skipFiles] RegExps to test against when removing call sites.
 *   By default a RegExp for internal filenames is provided.
 * @returns Returns a list of V8 open handles.
 */
export declare let getV8OpenHandles: ((options?: {
    skipFiles?: RegExp[];
}) => V8OpenHandle[]) & {
    hook: any;
};
