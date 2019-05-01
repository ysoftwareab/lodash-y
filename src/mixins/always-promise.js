export let alwaysPromise = function(maybePromiseLike) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  return Promise.resolve(maybePromiseLike);
};
