export let onceIn = function(...args) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return _.throttleTrue(...args);
};
