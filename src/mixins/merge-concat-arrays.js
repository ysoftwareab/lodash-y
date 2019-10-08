export let mergeConcatArrays = function(object, ...sources) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

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
