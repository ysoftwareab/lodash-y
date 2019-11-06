import _ from 'lodash';

import {
  Fn
} from '../types';

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
export let throttleTrue = function<T extends Fn>(origFn: T, interval: number): T & _.Cancelable {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = _.assign(function(...args: Parameters<T>): ReturnType<T> {
    // special case for direct call
    if (interval === 0) {
      return origFn(...args) as ReturnType<T>;
    }

    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = origFn(...args);
    return lastInvokeResult;
  } as T, {
    flush: function() {
      lastInvokeTime = 0;
    },
    cancel: function() {
      lastInvokeTime = 0;
    }
  });

  return toInvoke;
};
