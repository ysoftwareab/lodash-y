export let sleep = async function(ms = 0) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  let deferred = _.deferred();
  _.delay(deferred.resolve, ms);
  await deferred.promise;
};
