export let alwaysPromise = function(maybePromiseLike) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  return Promise.resolve(maybePromiseLike);
};
