import _ from 'lodash';

/**
 * Part of `lodash-y`.
 *
 * Same as _.merge but don't merge arrays. Just override them.
 *
 * @param object The destination object.
 * @param sources The source objects.
 * @returns Returns object.
 */
export let mergeWithoutArrays = function(object, ...sources): unknown {
  return _.mergeWith(object, ...sources, function(_objValue, srcValue) {
    // treat arrays as primitives, don't deep merge
    if (_.isArray(srcValue)) {
      return srcValue;
    }
  });
};
