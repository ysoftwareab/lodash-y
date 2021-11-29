import _ from 'lodash';

/**
 * Part of `lodash-y`.
 *
 * Same as _.merge but don't merge arrays. Just concat them.
 *
 * @param object The destination object.
 * @param sources The source objects.
 * @returns Returns object.
 */
export let mergeConcatArrays = function(object, ...sources): unknown {
  return _.mergeWith(object, ...sources, function(objValue, srcValue) {
    // treat arrays as concat-merge, don't deep merge by index
    if (_.isArray(objValue) && _.isArray(srcValue)) {
      return [
        ...objValue,
        ...srcValue
      ];
    }
  });
};
