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
 * @param {number} [ms=0] Number of milliseconds to sleep.
 * @returns {Promise<void>} .
 */
export let sleep = async function(ms = 0) {
  let d = deferred();
  _.delay(function() {
    d.resolve();
  }, ms);
  await d.promise;
};
