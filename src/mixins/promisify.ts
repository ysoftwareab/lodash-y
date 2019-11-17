import _ from 'lodash';

import {
  AsyncFn,
  CallbackFn,
  Fn
} from '../types';

import {
  deferred
} from './deferred';

// NOTE follows closely Node.js util.promisify

/**
 * Part of `lodash-firecloud`.
 *
 * Convert callback-like function into Promise.
 *
 * @param origFn Callback-based function to promisify.
 * @param options Options.
 * @param [options.callbackFirst=false] Specifies if the callback is the first argument to origFn.
 * @param [options.errorInCallback=true] Specifies if error is the first argument to the callback.
 * @returns Returns an async function wrapping the original function.
 */
export let promisify = function(origFn: Fn, options: {
  callbackFirst?: boolean;
  errorInCallback?: boolean;
} = {}): AsyncFn {
  _.defaults(options, {
    callbackFirst: false,
    errorInCallback: true
  });

  let fn = async function(...args): Promise<unknown> {
    let d = deferred();

    let callback = function(...results): CallbackFn {
      if (options.errorInCallback) {
        let err = results.shift();
        if (!_.isUndefined(err)) {
          d.reject(err);
          return;
        }
      }

      switch (results.length) {
      case 0:
        d.resolve();
        break;

      case 1:
        d.resolve(results[0]);
        break;

      default:
        d.resolve(results);
        break;
      }
    };

    if (options.callbackFirst) {
      args.unshift(callback);
    } else {
      args.push(callback);
    }
    origFn(...args);

    return d.promise;
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};
