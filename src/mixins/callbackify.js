import _ from 'lodash';

// NOTE follows closely Node.js util.callbackify

/**
 * Part of `lodash-firecloud`.
 *
 * Convert Promise into callback-like function.
 *
 * @param {Function} origFn Promise to callbackify.
 * @param {Object} options Options object.
 * @param {boolean} [options.callbackFirst='false'] Specifies if callback is a first arg.
 * @param {boolean} [options.errorInCallback='true'] Specifies if the first arg of callback is an error.
 * @param {boolean} [options.keepCallback='false'] Specifies if the callback arg should be passed to the Promise.
 * @returns {Function} Returns a callback-like function wrapping original `fn`.
 */
export let callbackify = function(origFn, options = {}) {
  _.defaults(options, {
    callbackFirst: false,
    errorInCallback: true,
    keepCallback: false
  });

  let fn = function(...args) {
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
    let callback = (...args) => {
      // eslint-disable-next-line babel/no-invalid-this
      Reflect.apply(origCallback, this, args);
      // origCallback(...args);
    };

    let onFullfilled = function(result) {
      if (options.errorInCallback) {
        setTimeout(callback, 0, undefined, result);
      } else {
        setTimeout(callback, 0, result);
      }
    };

    let onRejected = function(err) {
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
