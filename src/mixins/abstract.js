/**
 * Part of `lodash-firecloud`.
 *
 * Create a stub function that throws an error when invoked. Supposed to be overriden.
 *
 * @param {string} [name='it'] Name of the method to be abstracted.
 * @returns {Function} Returns a function that throws error when invoked.
 */
export let abstract = function(name = 'it') {
  return function() {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};
