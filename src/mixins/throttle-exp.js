
export let throttleExp = function(func, wait, options = {}) {
  // eslint-disable-next-line consistent-this, babel/no-invalid-this
  let _ = this;

  _.defaults(options, {
    leading: true,
    trailing: true,
    multiplier: 2,
    divider: Infinity,
    maxWait: Infinity
  });

  let timer;
  let lastResult;
  let lastCall;

  let {
    leading,
    trailing,
    multiplier,
    divider,
    maxWait
  } = options;

  let curWait;
  let wasThrottled = false;

  let invokeFunc = function() {
    let {
      lastThis,
      lastArgs
    } = lastCall;

    lastCall = undefined;

    lastResult = func.apply(lastThis, lastArgs);
  };

  let tryLeading = function() {
    setTimer();
    if (leading) {
      invokeFunc();
    }
  };

  let tryTrailing = function() {
    if (trailing && lastCall) {
      setTimer();
      invokeFunc();
    }
  };

  let clearTimer = function() {
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    timer = undefined;
  };

  let onTimer = function() {
    clearTimer();
    tryTrailing();
  };

  let setTimer = function() {
    if (timer) {
      return;
    }

    if (!curWait) {
      curWait = wait; // first call
    } else if (wasThrottled) {
      curWait = curWait * multiplier;
    } else {
      curWait = curWait / divider;
    }

    wasThrottled = false;

    curWait = _.clamp(curWait, wait, maxWait);

    timer = setTimeout(onTimer, curWait);
  };

  let fn = function(...args) {
    lastCall = {
      // eslint-disable-next-line babel/no-invalid-this
      lastThis: this,
      lastArgs: args
    };

    if (timer) {
      wasThrottled = true;
      return lastResult;
    }

    tryLeading();

    return lastResult;
  };

  fn.cancel = function() {
    clearTimer();
    lastCall = undefined;
  };

  fn.flush = function() {
    clearTimer();
    tryTrailing();
    return lastResult; // as per original _.debounce
  };

  return fn;
};
