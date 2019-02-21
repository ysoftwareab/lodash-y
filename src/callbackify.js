// NOTE follows closely Node.js util.callbackify

export let callbackify = function(origFn, {
  callbackFirst = false,
  errorInCallback = true,
  keepCallback = false
} = {}) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  let fn = function(...args) {
    let origCallback;
    if (callbackFirst) {
      origCallback = _.head(args);
      if (!keepCallback) {
        args.shift();
      }
    } else {
      origCallback = _.last(args);
      if (!keepCallback) {
        args.pop();
      }
    }
    let callback = (...args) => {
      // eslint-disable-next-line no-invalid-this
      Reflect.apply(origCallback, this, args);
      // origCallback(...args);
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
    // origFn(...args).then(onFullfilled, onRejected);
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};

export default callbackify;
