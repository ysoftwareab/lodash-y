import _ from 'lodash';

import {
  AsyncFn,
  Fn
} from '../types';

/**
 * Part of `lodash-firecloud`.
 *
 * Create a void-returning Function that executes an AsyncFunction with a catch handler.
 * It is intended to handle situations highlighted by @typescript-eslint/no-misused-promises eslint rule,
 * specifically the termination of the process for unhandled promise rejections.
 * See https://github.com/nodejs/node/issues/20392 .
 * See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin .
 *
 * @param [callback] Async callback.
 * @returns Returns a sync callback wrapper.
 */
export let asyncCb = function<T extends AsyncFn<void>>(cb: T): Fn<void, Parameters<T>> {
  return function(...args) {
    // eslint-disable-next-line callback-return
    cb(...args).catch(function(err) {
      throw err;
    });
  };
};
