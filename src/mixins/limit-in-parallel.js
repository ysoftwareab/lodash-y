// TODO is there a way not to duplicate the function just because fn is sync or async?

// eslint-disable-next-line firecloud/underscore-prefix-non-exported
let AsyncFunction = Object.getPrototypeOf(async function() { /* noop */ }).constructor;

// useful for checks like `err instanceof _.LimitInParallelError`
export class LimitInParallelError extends Error {
}

export let limitInParallel = function(origFn, options = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  options = _.defaults(options, {
    limit: 1,
    throwErr: false
  });

  let activeCount = 0;

  // eslint-disable-next-line no-undef
  if (origFn instanceof AsyncFunction) {
    let fn = async function() {
      if (activeCount >= options.limit) {
        let err = new LimitInParallelError(`Can only run this function maximum ${options.limit} times in parallel.`);
        if (options.throwErr) {
          throw err;
        }
        return err;
      }
      activeCount = activeCount + 1;

      let result;
      let err;
      try {
        result = await origFn();
      } catch (err2) {
        err = err2;
      } finally {
        activeCount = activeCount - 1;
      }

      if (err) {
        throw err;
      }
      return result;
    };
    return fn;
  }

  let fn = function() {
    if (activeCount >= options.limit) {
      let err = new LimitInParallelError(`Can only run this function maximum ${options.limit} times in parallel.`);
      if (options.throwErr) {
        throw err;
      }
      return err;
    }
    activeCount = activeCount + 1;

    let result;
    let err;
    try {
      result = origFn();
    } catch (err2) {
      err = err2;
    } finally {
      activeCount = activeCount - 1;
    }

    if (err) {
      throw err;
    }
    return result;
  };
  return fn;
};
