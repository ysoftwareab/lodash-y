import _ from 'lodash';
import { CallbackFn } from '../types';
export interface Observer {
    new (cb: (entries: unknown[], ...args: unknown[]) => void): any;
    observe(...args: unknown[]): CallbackFn | unknown;
    unobserve(...args: unknown[]): unknown;
}
declare type isEntryMatchFn = (source: object, object: object) => boolean;
/**
 * Part of `lodash-firecloud`.
 *
 * Gets info about the V8 open handles.
 *
 * @param Observer The Observer class.
 * @param [isEntryMatch=_.isMatch] The function to check if entries match.
 * @returns Returns a reused Observer.
 *
 */
export declare let reuseObserver: ((Observer: Observer, isEntryMatch?: isEntryMatchFn) => Observer) & _.MemoizedFunction;
export {};
