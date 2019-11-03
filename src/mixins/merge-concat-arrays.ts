import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Same as _.merge but don't merge arrays. Just concat them.
 *
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @returns {Object} Returns object.
 */
export let mergeConcatArrays = function(object, ...sources) {
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
