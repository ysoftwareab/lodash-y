import _ from 'lodash';
import { Fn } from '../types';
/**
 * Part of `lodash-firecloud`.
 *
 * A "true" _.throttle with 'trailing': false".
 * A lightweight version which does not allocate unnecessary timer,
 * comparing to the original _.throttle (which invokes _.debounce under the hood).
 *
 * @param origFn Function to throttle.
 * @param interval Throttling interval.
 * @returns The throttled function.
 */
export declare let throttleTrue: <T extends Fn<unknown, unknown[]>>(origFn: T, interval: number) => T & _.Cancelable;
