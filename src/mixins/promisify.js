import _ from 'lodash';

import {
  deferred
} from './deferred';

// NOTE follows closely Node.js util.promisify

/**
 * @typedef {Function} AsyncFunction
 * @returns {Promise}
 */

/**
 * Part of `lodash-firecloud`.
 *
 * Convert callback-like function into Promise.
 *
 * @param {Function} origFn Callback-based function to promisify.
 * @param {Object} options Options.
 * @param {boolean} [options.callbackFirst=false] Specifies if the callback is the first argument to origFn.
 * @param {boolean} [options.errorInCallback=true] Specifies if error is the first argument to the callback.
 * @returns {AsyncFunction} Returns an async function wrapping the original function.
 */
export let promisify = function(origFn, {
  callbackFirst = false,
  errorInCallback = true
} = {}) {
  let fn = async function(...args) {
    let d = deferred();

    let callback = function(...results) {
      if (errorInCallback) {
        let err = results.shift();
        if (err) {
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

    if (callbackFirst) {
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
