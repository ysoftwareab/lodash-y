export let sleep = function(ms = 0) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return new Promise(function(resolve, _reject) {
    _.delay(resolve, ms);
  });
};
