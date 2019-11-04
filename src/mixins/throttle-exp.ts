import _ from 'lodash';

import {
  Fn
} from '../types';

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
 * @returns {Function} The throttled function.
 */
export let throttleExp = function<T extends Fn>(origFn: T, wait: number, options: {
  leading?: boolean,
  trailing?: boolean,
  multiplier?: number,
  divider?: number,
  maxWait?: number
} = {}): T & _.Cancelable {
  _.defaults(options, {
    leading: true,
    trailing: true,
    multiplier: 2,
    divider: Infinity,
    maxWait: Infinity
  });
  let timer;
  let lastResult;
  let lastCall;

  let curWait;
  let wasThrottled = false;

  let invokeFn = function(): void {
    let {
      lastThis,
      lastArgs
    } = lastCall;

    lastCall = undefined;

    lastResult = origFn.apply(lastThis, lastArgs);
  };

  let tryLeading = function(): void {
    setTimer();
    if (options.leading) {
      invokeFn();
    }
  };

  let tryTrailing = function(): void {
    if (options.trailing && lastCall) {
      setTimer();
      invokeFn();
    }
  };

  let clearTimer = function(): void {
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    timer = undefined;
  };

  let onTimer = function(): void {
    clearTimer();
    tryTrailing();
  };

  let setTimer = function(): void {
    if (timer) {
      return;
    }

    if (!curWait) {
      curWait = wait; // first call
    } else if (wasThrottled) {
      curWait = curWait * options.multiplier;
    } else {
      curWait = curWait / options.divider;
    }

    wasThrottled = false;

    curWait = _.clamp(curWait, wait, options.maxWait);

    timer = setTimeout(onTimer, curWait);
  };

  let fn = (function(...args): ReturnType<T> {
    lastCall = {
      // eslint-disable-next-line babel/no-invalid-this
      lastThis: this,
      lastArgs: args
    };

    if (timer) {
      wasThrottled = true;
      return lastResult;
    }

    tryLeading();

    return lastResult;
  }) as T & _.Cancelable;

  fn.cancel = function() {
    clearTimer();
    lastCall = undefined;
  };

  fn.flush = function() {
    clearTimer();
    tryTrailing();
    return lastResult; // as per original _.debounce
  };

  return fn;
};
