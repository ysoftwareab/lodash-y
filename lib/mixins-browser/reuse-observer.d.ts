import _ from 'lodash';
import { CallbackFn } from '../types';
export interface ReuseObserverCallbackFn {
    (entries: unknown[], ...args: unknown[]): void;
}
export interface Observer {
    observe(...args: unknown[]): void;
    unobserve?(...args: unknown[]): void;
    disconnect?(): void;
}
export interface ObserverConstructor {
    new (...args: any[]): Observer;
}
export interface ReuseObserver extends Observer {
    _cb: CallbackFn;
    observe(...args: unknown[]): CallbackFn;
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
export declare let reuseObserver: ((Observer: ObserverConstructor, isEntryMatch?: IsEntryMatchFn) => ReuseObserver) & _.MemoizedFunction;
