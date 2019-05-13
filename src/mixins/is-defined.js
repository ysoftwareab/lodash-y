export let isDefined = function(value) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;
  return !_.isUndefined(value);
};
