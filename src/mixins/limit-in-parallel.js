import _ from 'lodash';

// eslint-disable-next-line firecloud/underscore-prefix-non-exported
let AsyncFunction = Object.getPrototypeOf(async function() { /* noop */ }).constructor;

// useful for checks like `err instanceof _.LimitInParallelError`
export class LimitInParallelError extends Error {
}

// TODO is there a way not to duplicate the function just because origFn is sync or async?

/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that can only run maximum n times in parallel.
 *
 * @param {Function} origFn The function to have its parallelism limited.
 * @param {Object} options The options.
 * @param {number} [options.limit=1] Specifies the maximum number of parallel executions.
 * @param {boolean} [options.throwErr=false] Specifies whether to throw an error when the limit has been reached.
 * @returns {Function} Returns the new limited function.
 */
export let limitInParallel = function(origFn, options = {}) {
  _.defaults(options, {
    limit: 1,
    throwErr: false
  });
  let activeCount = 0;

  // eslint-disable-next-line no-undef
  if (origFn instanceof AsyncFunction) {
    let fn = async function(...args) {
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
        result = await origFn(...args);
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

  let fn = function(...args) {
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
      result = origFn(...args);
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
