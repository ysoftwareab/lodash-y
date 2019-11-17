import _ from 'lodash';

import {
  Fn,
  FnChangeReturnType,
  Unpromise
} from '../types';

// eslint-disable-next-line firecloud/underscore-prefix-non-exported, @typescript-eslint/explicit-function-return-type
let AsyncFunction = Object.getPrototypeOf(async function() { /* noop */ }).constructor;

// useful for checks like `err instanceof _.LimitInParallelError`
export class LimitInParallelError extends Error {
}

export interface LimitInParallelOptions {
  limit?: number;
  throwErr?: boolean;
}

// TODO is there a way not to duplicate the function just because origFn is sync or async?

/**
 * Part of `lodash-firecloud`.
 *
 * Create a function that can only run maximum n times in parallel.
 *
 * @param origFn The function to have its parallelism limited.
 * @param options The options.
 * @param [options.limit=1] Specifies the maximum number of parallel executions.
 * @param [options.throwErr=false] Specifies whether to throw an error when the limit has been reached.
 * @returns Returns the new limited function.
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/explicit-function-return-type
export let limitInParallel = function<
  T extends Fn
>(origFn: T, options: {
  limit?: number;
  throwErr?: boolean;
} = {}): FnChangeReturnType<T, Unpromise<ReturnType<T>> | LimitInParallelError> {
  _.defaults(options, {
    limit: 1,
    throwErr: false
  });
  let activeCount = 0;

  // eslint-disable-next-line no-undef
  if (origFn instanceof AsyncFunction) {
    let fn = async function(...args: Parameters<T>): Promise<Unpromise<ReturnType<T>> | LimitInParallelError> {
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

      if (!_.isUndefined(err)) {
        throw err;
      }
      return result;
    };
    // @ts-ignore
    return fn;
  }

  let fn = function(...args: unknown[]): ReturnType<T> | LimitInParallelError {
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

    if (!_.isUndefined(err)) {
      throw err;
    }
    return result;
  };
  // @ts-ignore
  return fn;
};
