// NOTE follows closely Node.js util.promisify

export let promisify = function(origFn, {
  callbackFirst = false,
  errorInCallback = true
} = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let fn = async function(...args) {
    let deferred = _.deferred();

    let callback = function(...results) {
      if (errorInCallback) {
        let err = results.shift();
        if (err) {
          deferred.reject(err);
          return;
        }
      }

      switch (results.length) {
      case 0:
        deferred.resolve();
        break;

      case 1:
        deferred.resolve(results[0]);
        break;

      default:
        deferred.resolve(results);
        break;
      }
    };

    if (callbackFirst) {
      args.unshift(callback);
    } else {
      args.push(callback);
    }
    origFn(...args);

    return deferred.promise;
  };

  Object.setPrototypeOf(fn, Object.getPrototypeOf(origFn));
  Object.defineProperties(fn, Object.getOwnPropertyDescriptors(origFn));

  return fn;
};
