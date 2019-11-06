import _ from 'lodash';

import {
  deferred
} from './deferred';

/**
 * Part of `lodash-firecloud`.
 *
 * An async function that is resolved after a desired sleep time.
 *
 * @async
 * @param [ms=0] Number of milliseconds to sleep.
 * @returns .
 */
export let sleep = async function(ms = 0): Promise<void> {
  let d = deferred();
  _.delay(function() {
    d.resolve();
  }, ms);
  await d.promise;
};
