import _ from 'lodash';
import { Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * Throttle a function exponentially.
 *
 * @param origFn Function to throttle.
 * @param wait Starting (minimum) wait time.
 * @param options Options.
 * @param [options.leading=true] Specifies if `origFn` should be invoked on leading edge.
 * @param [options.trailing=true] Specifies if `origFn` should be invoked on trailing edge.
 * @param [options.maxWait=Infinity] Specifies max value of `wait` as it exponentially grows.
 * @param [options.multiplier=2] Specifies a multiplier for `wait` applied on every actual invocation.
 * @param [options.divider=Infinity] Specifies a divider for `wait` used on actual invocation
 * if the previous call was not throttled.
 * @returns The throttled function.
 */
export declare let throttleExp: <T extends Fn<unknown, unknown[]>>(origFn: T, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
    multiplier?: number;
    divider?: number;
    maxWait?: number;
}) => T & _.Cancelable;
