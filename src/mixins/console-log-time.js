/**
 * Part of `lodash-firecloud`.
 *
 * Log execution time of a function.
 *
 * @param {string} label Label for current measurement, that will be displayed in the console.
 * @param {Function} fn A function to measure execution time of.
 * @returns {Promise<?>} Returns the return value of the function.
 */
export let consoleLogTime = async function(label, fn) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  // eslint-disable-next-line no-console
  console.log(label);

  // eslint-disable-next-line no-console
  console.time(label);

  let returnValue = await fn();

  // eslint-disable-next-line no-console
  console.timeEnd(label);
  return returnValue;
};
