import _ from 'lodash';

import {
  Fn
} from '../types';

/**
 * @typedef {import("lodash").Cancelable} Cancelable
 * @typedef {Function & Cancelable} CancelableFunction
 */

/**
 * Part of `lodash-firecloud`.
 *
 * A "true" _.throttle with 'trailing': false"
 * A lightweight version which does not allocate unnecessary timer,
 * comparing to the original _.throttle (which invokes _.debounce under the hood).
 *
 * @param origFn Function to throttle.
 * @param interval Throttling interval.
 * @returns The throttled function.
 */
export let throttleTrue = function<T extends Fn>(origFn: T, interval: number): T & _.Cancelable {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = (function(...args): ReturnType<T> {
    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = origFn(...args);
    return lastInvokeResult;
  }) as T & _.Cancelable;

  // special case for direct call
  if (interval === 0) {
    // @ts-ignore
    toInvoke = function(...args) {
      return origFn(...args);
    };
  }

  // _.throttle consistency
  toInvoke.flush = function() {
    lastInvokeTime = 0;
  };
  toInvoke.cancel = toInvoke.flush;

  return toInvoke;
};
