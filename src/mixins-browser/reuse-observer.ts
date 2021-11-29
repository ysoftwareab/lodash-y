import _ from 'lodash';
import globalThis from './.global-this';

import {
  CallbackFn
} from '../types';

// Create an reusable matchy-match (and normalized) observer.
// - reusable because it's the observe method that takes a callback, which will only fire for the matching entries
// - matchy-match because the observe method takes a _.isMatch object to filter matching entries
// - normalized because the observer works the same no matter the source observer:
//   - all callbacks get a reference to the observer
//   - even MutationObserver has a unobserve method
//   - CustomIntersectionObserver can't take options in the constructor
//   - CanonicalIntersectionObserver takes options in the observe method, not in the constructor
//
// Usage:
//
// let observer = _.reuseObserver(MutationObserver);
// canonical form:
// let unobserve = observer.observe(
//   {element: document.documentElement},
//   function(documentElementMutationRecords) {...},
//   document.documentElement
// );
// or convenience form:
// let unobserve = observer.observe(
//   document.documentElement,
//   function(documentElementMutationRecords) {...}
// );
//
// let observer = _.reuseObserver(IntervalObserver);
// let unobserve = observer.observe(
//   {interval: 1000},
//   function(everySecondEntries) {...},
//   {interval: 1000}
// );
//
// let observer = _.reuseObserver(getCustomIntersectionObserver(options));
// let unobserve = observer.observe(
//   {element: document.documentElement},
//   function(documentElementEntries)
// );
//
// Similarly

export interface ReuseObserverCallbackFn {
  (entries: unknown[], ...args: unknown[]): void;
}

export interface Observer {
  observe(...args: unknown[]): void;
  unobserve?(...args: unknown[]): void;
  disconnect?(): void;
}

export interface ObserverConstructor {
  new(...args: any[]): Observer;
}

export interface ReuseObserver extends Observer {
  _cb: CallbackFn;
  observe(...args: unknown[]): CallbackFn;
}

export interface IsEntryMatchFn {
  (source: object, object: object): boolean;
}

type ElementObserver = IntersectionObserver | MutationObserver | ResizeObserver;

let _observerIsElementObserver = function(observer: ElementObserver | unknown): observer is ElementObserver {
  if (observer instanceof globalThis.IntersectionObserver) {
    return true;
  }
  if (observer instanceof globalThis.MutationObserver) {
    return true;
  }
  if (observer instanceof globalThis.ResizeObserver) {
    return true;
  }
  return false;
};

let _memoizeResolver = function(Observer: ObserverConstructor, isEntryMatch: IsEntryMatchFn): string {
  return Observer.toString() + isEntryMatch.toString();
};

/**
 * Part of `lodash-y`.
 *
 * Create an observer that reuses an instance of a given Observer class.
 *
 * @param Observer The Observer class.
 * @param [isEntryMatch=_.isMatch] The function to check if entries match.
 * @returns Returns a reused Observer.
 *
 */
export let reuseObserver = _.memoize(function(
  Observer: ObserverConstructor,
  isEntryMatch: IsEntryMatchFn = _.isMatch.bind(_)
) {
  let matchListenerPairs = []; // [{match, listeners}]
  let cb = function(entries, ...args): void {
    // normalize cb signature to always pass a reference to the observer
    // eslint-disable-next-line babel/no-invalid-this
    if (_.includes(args, this)) {
      // eslint-disable-next-line babel/no-invalid-this
      args.push(this);
    }

    _.forEach(matchListenerPairs, function({match, listeners}): void {
      let matchingEntries = _.filter(entries, function(entry): boolean {
        return isEntryMatch(entry, match);
      });

      _.forEach(listeners, function(listener): void {
        listener(matchingEntries, ...args);
      });
    });
  };

  let observer = new Observer(cb) as ReuseObserver;
  let originalObserve = observer.observe.bind(observer);
  observer.observe = function(match: any, listener, ...observeArgs): CallbackFn {
    // convenience for known element observers
    if (_observerIsElementObserver(observer)) {
      if (_.isElement(match)) {
        match = {
          target: match
        };
      }
      if (!_.isElement(observeArgs[0])) {
        observeArgs.unshift(match.target);
      }
    }

    let matchListenersPair = _.find(matchListenerPairs, function(matchListenersPair) {
      return matchListenersPair.match === match;
    });
    if (_.isUndefined(matchListenersPair)) {
      matchListenersPair = {
        match,
        listeners: []
      };
      matchListenerPairs.push(matchListenersPair);
    }
    matchListenersPair.listeners.push(listener);
    originalObserve(...observeArgs);

    let unobserve = (...args): void => {
      this.unobserve(match, listener, ...args);
    };
    return unobserve;
  };

  let originalUnobserve = _.defaultTo(observer.observe, _.noop).bind(observer);
  observer.unobserve = function(match: any, listener, ...unobserveArgs): void {
    if (_.isFunction(originalUnobserve)) {
      // convenience for known element observers
      if (_observerIsElementObserver(observer)) {
        if (_.isElement(match)) {
          match = {
            target: match
          };
        }
        if (!_.isElement(unobserveArgs[0])) {
          unobserveArgs.unshift(match.target);
        }
      }
    }

    // eslint-disable-next-line lodash/prefer-immutable-method
    _.remove(matchListenerPairs, function(matchListenersPair) {
      return matchListenersPair.match === match && matchListenersPair.listener === listener;
    });
    originalUnobserve(...unobserveArgs);
  };

  let originalDisconnect = _.defaultTo(observer.disconnect, _.noop).bind(observer);
  observer.disconnect = function(): void {
    originalDisconnect();
    matchListenerPairs = [];
  };

  return observer;
});
