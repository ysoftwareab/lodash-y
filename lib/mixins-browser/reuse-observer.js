"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.reuseObserver = exports._memoizeResolver = exports._observerIsElementObserver = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _globalThis = _interopRequireDefault(require("./.global-this"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}






















































let _observerIsElementObserver = function (observer) {
  if (observer instanceof _globalThis.default.IntersectionObserver) {
    return true;
  }
  if (observer instanceof _globalThis.default.MutationObserver) {
    return true;
  }
  if (observer instanceof _globalThis.default.ResizeObserver) {
    return true;
  }
  return false;
};exports._observerIsElementObserver = _observerIsElementObserver;

let _memoizeResolver = function (Observer, isEntryMatch) {
  return Observer.toString() + isEntryMatch.toString();
};

/**
    * Part of `lodash-firecloud`.
    *
    * Gets info about the V8 open handles.
    *
    * @param Observer The Observer class.
    * @param [isEntryMatch=_.isMatch] The function to check if entries match.
    * @returns Returns a reused Observer.
    *
    */exports._memoizeResolver = _memoizeResolver;
let reuseObserver = _lodash.default.memoize(function (
Observer,
isEntryMatch = _lodash.default.isMatch.bind(_lodash.default))
{
  let matchListenerPairs = []; // [{match, listeners}]
  let cb = function (entries, ...args) {
    // normalize cb signature to always pass a reference to the observer
    // eslint-disable-next-line babel/no-invalid-this
    if (_lodash.default.includes(args, this)) {
      // eslint-disable-next-line babel/no-invalid-this
      args.push(this);
    }

    _lodash.default.forEach(matchListenerPairs, function ({ match, listeners }) {
      let matchingEntries = _lodash.default.filter(entries, function (entry) {
        return isEntryMatch(entry, match);
      });

      _lodash.default.forEach(listeners, function (listener) {
        listener(matchingEntries, ...args);
      });
    });
  };

  let observer = new Observer(cb);
  observer._cb = cb.bind(observer);
  let originalObserve = observer.observe;
  originalObserve = originalObserve.bind(observer);
  observer.observe = function (match, listener, ...observeArgs) {
    // convenience for known element observers
    if (exports._observerIsElementObserver(observer)) {
      if (_lodash.default.isElement(match)) {
        match = {
          target: match };

      }
      if (!_lodash.default.isElement(observeArgs[0])) {
        observeArgs.unshift(match.target);
      }
    }

    let matchListenersPair = _lodash.default.find(matchListenerPairs, {
      match });

    if (_lodash.default.isUndefined(matchListenersPair)) {
      matchListenersPair = {
        match,
        listeners: [] };

      matchListenerPairs.push(matchListenersPair);
    }
    matchListenersPair.listeners.push(listener);
    originalObserve(...observeArgs);

    let unobserve = (...args) => {
      this.unobserve(match, listener, ...args);
    };
    return unobserve;
  };

  let originalUnobserve = observer.observe;
  if (_lodash.default.isFunction(originalUnobserve)) {
    originalUnobserve = originalUnobserve.bind(observer);
  }
  observer.unobserve = function (match, listener, ...unobserveArgs) {
    if (_lodash.default.isFunction(originalUnobserve)) {
      // convenience for known element observers
      if (exports._observerIsElementObserver(observer)) {
        if (_lodash.default.isElement(match)) {
          match = {
            target: match };

        }
        if (!_lodash.default.isElement(unobserveArgs[0])) {
          unobserveArgs.unshift(match.target);
        }
      }
    }

    // eslint-disable-next-line lodash/prefer-immutable-method
    _lodash.default.remove(matchListenerPairs, {
      match,
      listener });

    originalUnobserve(...unobserveArgs);
  };

  let originalDisconnect = observer.disconnect;
  originalDisconnect = originalDisconnect.bind(observer);
  observer.disconnect = function () {
    originalDisconnect();
    matchListenerPairs = [];
  };

  return observer;
});exports.reuseObserver = reuseObserver;

//# sourceMappingURL=reuse-observer.js.map