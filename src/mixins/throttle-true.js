export let throttleTrue = function(origFn, interval) {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = function(...args) {
    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = origFn(...args);
    return lastInvokeResult;
  };

  // special case for direct call
  if (interval === 0) {
    toInvoke = function(...args) {
      return origFn(...args);
    };
  }

  // _.throttle consistency
  toInvoke.flush = function() {
    lastInvokeTime = 0;
  };
  toInvoke.cancel = toInvoke.flush;

  return toInvoke;
};
