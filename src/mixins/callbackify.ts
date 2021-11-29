import _ from 'lodash';

import {
  AsyncFn,
  CallbackFn
} from '../types';

// NOTE follows closely Node.js util.callbackify

/**
 * Part of `lodash-y`.
 *
 * Convert Promise into callback-like function.
 *
 * @param origFn Promise to callbackify.
 * @param options Options object.
 * @param [options.callbackFirst=false] Specifies if callback is a first arg.
 * @param [options.errorInCallback=true] Specifies if the first arg of callback is an error.
 * @param [options.keepCallback=false] Specifies if the callback arg should be passed to the Promise.
 * @returns Returns a callback-like function wrapping original `fn`.
 */
export let callbackify = function(origFn: AsyncFn, options: {
  callbackFirst?: boolean;
  errorInCallback?: boolean;
  keepCallback?: boolean;
} = {}): CallbackFn {
  _.defaults(options, {
    callbackFirst: false,
    errorInCallback: true,
    keepCallback: false
  });

  let fn = function(...args): void {
    let origCallback;
    if (options.callbackFirst) {
      origCallback = _.head(args);
      if (!options.keepCallback) {
        args.shift();
      }
    } else {
      origCallback = _.last(args);
      if (!options.keepCallback) {
        args.pop();
      }
    }
    let callback = (...args): void => {
      // eslint-disable-next-line babel/no-invalid-this
      Reflect.apply(origCallback, this, args);
      // origCallback(...args);
    };

    let onFullfilled = function(result): void {
      if (options.errorInCallback) {
        setTimeout(callback, 0, undefined, result);
      } else {
        setTimeout(callback, 0, result);
      }
    };

    let onRejected = function(err): void {
      if (options.errorInCallback) {
        setTimeout(callback, 0, err);
      } else {
        setTimeout(callback, 0);
      }
    };

    // eslint-disable-next-line babel/no-invalid-this
    Reflect.apply(origFn, this, args).then(onFullfilled, onRejected);
    // origFn(...args).then(onFullfilled, onRejected);
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};
