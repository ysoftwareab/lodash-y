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
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let deferred = _.deferred();
  _.delay(deferred.resolve, ms);
  await deferred.promise;
};
