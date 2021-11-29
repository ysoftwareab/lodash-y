import {
  throttleTrue
} from './throttle-true';

/**
 * DEPRECATED. Use _.throttleTrue() instead.
 *
 * Part of `lodash-y`.
 *
 * A "true" _.throttle with 'trailing': false".
 * A lightweight version which does not allocate unnecessary timer,
 * comparing to the original _.throttle (which invokes _.debounce under the hood).
 *
 * @param fn Function to throttle.
 * @param interval Throttling interval.
 * @returns Returns a throttled function.
 */
export let onceIn = throttleTrue;
