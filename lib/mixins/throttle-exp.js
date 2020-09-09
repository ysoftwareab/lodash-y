"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.throttleExp = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





/**
                                                                                                                                                                                                                                                               * Part of `lodash-firecloud`.
                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                               * Throttle a function exponentially.
                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                               * @param origFn Function to throttle.
                                                                                                                                                                                                                                                               * @param wait Starting (minimum) wait time.
                                                                                                                                                                                                                                                               * @param options Options.
                                                                                                                                                                                                                                                               * @param [options.leading=true] Specifies if `origFn` should be invoked on leading edge.
                                                                                                                                                                                                                                                               * @param [options.trailing=true] Specifies if `origFn` should be invoked on trailing edge.
                                                                                                                                                                                                                                                               * @param [options.maxWait=Infinity] Specifies max value of `wait` as it exponentially grows.
                                                                                                                                                                                                                                                               * @param [options.multiplier=2] Specifies a multiplier for `wait` applied on every actual invocation.
                                                                                                                                                                                                                                                               * @param [options.divider=Infinity] Specifies a divider for `wait` used on actual invocation
                                                                                                                                                                                                                                                               * if the previous call was not throttled.
                                                                                                                                                                                                                                                               * @returns The throttled function.
                                                                                                                                                                                                                                                               */
let throttleExp = function (origFn, wait, options =





{}) {
  _lodash.default.defaults(options, {
    leading: true,
    trailing: true,
    multiplier: 2,
    divider: Infinity,
    maxWait: Infinity });

  let timer;
  let lastResult;
  let lastCall;

  let curWait;
  let wasThrottled = false;

  let invokeFn = function () {
    let {
      lastThis,
      lastArgs } =
    lastCall;

    lastCall = undefined;

    lastResult = origFn.apply(lastThis, lastArgs);
  };

  let tryLeading = function () {
    setTimer();
    if (options.leading) {
      invokeFn();
    }
  };

  let tryTrailing = function () {
    if (options.trailing && !_lodash.default.isUndefined(lastCall)) {
      setTimer();
      invokeFn();
    }
  };

  let clearTimer = function () {
    if (_lodash.default.isUndefined(timer)) {
      return;
    }

    clearTimeout(timer);
    timer = undefined;
  };

  let onTimer = function () {
    clearTimer();
    tryTrailing();
  };

  let setTimer = function () {
    if (!_lodash.default.isUndefined(timer)) {
      return;
    }

    if (_lodash.default.isUndefined(curWait)) {
      curWait = wait; // first call
    } else if (wasThrottled) {
      curWait = curWait * options.multiplier;
    } else {
      curWait = curWait / options.divider;
    }

    wasThrottled = false;

    curWait = _lodash.default.clamp(curWait, wait, options.maxWait);

    timer = setTimeout(onTimer, curWait);
  };

  let fn = _lodash.default.assign(function (...args) {
    lastCall = {
      // eslint-disable-next-line babel/no-invalid-this
      lastThis: this,
      lastArgs: args };


    if (!_lodash.default.isUndefined(timer)) {
      wasThrottled = true;
      return lastResult;
    }

    tryLeading();

    return lastResult;
  }, {
    cancel: function () {
      clearTimer();
      lastCall = undefined;
    },

    flush: function () {
      clearTimer();
      tryTrailing();
      return lastResult; // as per original _.debounce
    } });


  return fn;
};exports.throttleExp = throttleExp;

//# sourceMappingURL=throttle-exp.js.map