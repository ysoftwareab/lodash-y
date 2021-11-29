import _ from 'lodash';

import {
  Fn
} from '../types';

/**
 * Part of `lodash-y`.
 *
 * Map an object and all of its plain-object properties' values depth-wise with a given `fn`.
 *
 * @param origFn A function to process object and each of its plain-object properties.
 * Should return a value (processed object).
 * @returns Returns a function that accepts an object, on which `fn` will be invoked with a list of `args`.
 */
export let mapValuesDeep = function(origFn: Fn): Fn {
  let fn = function(obj, ...args): unknown {
    return origFn(_.mapValues(obj, function(v) {
      return _.isPlainObject(v) ? mapValuesDeep(origFn)(v, ...args) : v;
    }), ...args);
  };
  return fn;
};
