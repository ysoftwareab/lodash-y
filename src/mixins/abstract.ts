import {
  Fn
} from '../types';

/**
 * Part of `lodash-y`.
 *
 * Create a stub function that throws an error when invoked. Supposed to be overriden.
 *
 * @param [name='it'] Name of the method to be abstracted.
 * @returns Returns a function that throws error when invoked.
 */
export let abstract = function(name = 'it'): Fn<never> {
  return function() {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};
