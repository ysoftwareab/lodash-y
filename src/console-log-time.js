export let consoleLogTime = async function(label, fn) {
  // eslint-disable-next-line consistent-this, no-invalid-this
  let _ = this;

  // eslint-disable-next-line no-console
  console.log(label);

  // eslint-disable-next-line no-console
  console.time(label);

  let returnValue = fn();
  if (returnValue && _.isFunction(returnValue.then)) {
    returnValue = await returnValue;
  }

  // eslint-disable-next-line no-console
  console.timeEnd(label);
  return returnValue;
};

export default consoleLogTime;
