/// <reference types="lodash" />
/**
 * DEPRECATED. Use _.throttleTrue() instead.
 *
 * Part of `lodash-firecloud`.
 *
 * A "true" _.throttle with 'trailing': false".
 * A lightweight version which does not allocate unnecessary timer,
 * comparing to the original _.throttle (which invokes _.debounce under the hood).
 *
 * @param fn Function to throttle.
 * @param interval Throttling interval.
 * @returns Returns a throttled function.
 */
export declare let onceIn: <T extends import("../types-functions").Fn<unknown, unknown[]>>(origFn: T, interval: number) => T & import("lodash").Cancelable;
