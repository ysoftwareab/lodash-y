export let throttleTrue = function(fn, interval) {
  let lastInvokeTime = 0;
  let lastInvokeResult;

  let toInvoke = function(...args) {
    let now = Date.now();
    if (now - lastInvokeTime < interval) {
      return lastInvokeResult;
    }

    lastInvokeTime = now;
    lastInvokeResult = fn(...args);
    return lastInvokeResult;
  };

  // special case for direct call
  if (interval === 0) {
    toInvoke = function(...args) {
      return fn(...args);
    };
  }

  // _.throttle consistency
  toInvoke.flush = function() {
    lastInvokeTime = 0;
  };
  toInvoke.clear = toInvoke.flush;

  return toInvoke;
};
