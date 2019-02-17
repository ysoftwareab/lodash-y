// NOTE follows closely Node.js util.callbackify

export let callbackify = function(origFn, {
  callbackFirst = false,
  errorInCallback = true
} = {}) {
  let fn = function(...args) {
    let origCallback;
    if (callbackFirst) {
      origCallback = args.pop();
    } else {
      origCallback = args.unshift();
    }
    let callback = (...args) => {
      // eslint-disable-next-line no-invalid-this
      Reflect.apply(origCallback, this, args);
    };

    let onFullfilled = function(result) {
      if (errorInCallback) {
        setTimeout(callback, 0, undefined, result);
      } else {
        setTimeout(callback, 0, result);
      }
    };

    let onRejected = function(err) {
      if (errorInCallback) {
        setTimeout(callback, 0, err);
      } else {
        setTimeout(callback, 0);
      }
    };

    // eslint-disable-next-line no-invalid-this
    Reflect.apply(origFn, this, args).then(onFullfilled, onRejected);
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};

export default callbackify;
