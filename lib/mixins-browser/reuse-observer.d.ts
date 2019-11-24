import _ from 'lodash';
import { CallbackFn, Expand } from '../types';
export interface ReuseObserverCallbackFn {
    (entries: unknown[], ...args: unknown[]): void;
}
export interface ReuseObserver {
    _cb?: CallbackFn;
    observe(...args: unknown[]): CallbackFn | unknown;
    unobserve(...args: unknown[]): unknown;
    disconnect?(): void;
}
export interface ReuseObserverConstructor {
    new (cb: ReuseObserverCallbackFn): Expand<ReuseObserver & {
        disconnect(): void;
    }>;
}
export interface IsEntryMatchFn {
    (source: object, object: object): boolean;
}
/**
 * Part of `lodash-firecloud`.
 *
 * Create an observer that reuses an instance of a given Observer class.
 *
 * @param Observer The Observer class.
 * @param [isEntryMatch=_.isMatch] The function to check if entries match.
 * @returns Returns a reused Observer.
 *
 */
export declare let reuseObserver: ((Observer: ReuseObserverConstructor, isEntryMatch?: IsEntryMatchFn) => ReuseObserver) & _.MemoizedFunction;
