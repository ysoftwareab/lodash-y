export let alwaysPromise = function(maybePromiseLike) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  if (!_.isPlainObject(maybePromiseLike) && !_.isFunction(maybePromiseLike)) {
    return Promise.resolve(maybePromiseLike);
  }

  if (!_.isFunction(maybePromiseLike.then)) {
    return Promise.resolve(maybePromiseLike);
  }

  return maybePromiseLike;
};

export default alwaysPromise;