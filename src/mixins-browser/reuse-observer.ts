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

export interface Observer {
  new(cb: (entries: unknown[], ...args: unknown[]) => void);
  observe(...args: unknown[]): CallbackFn | unknown;
  unobserve(...args: unknown[]): unknown;
}

type isEntryMatchFn = (source: object, object: object) => boolean;

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

let _memoizeResolver = function(Observer: Observer, isEntryMatch: isEntryMatchFn): string {
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
 */
export let reuseObserver = _.memoize(function(
  Observer: Observer,
  isEntryMatch: isEntryMatchFn = _.isMatch.bind(_)
): Observer {
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

  let observer = new Observer(cb);
  observer._cb = cb.bind(observer);
  let originalObserve = observer.observe;
  originalObserve = originalObserve.bind(observer);
  observer.observe = function(match, listener, ...observeArgs): CallbackFn {
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

    let matchListenersPair = _.find(matchListenerPairs, {
      match
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

  let originalUnobserve = observer.observe;
  if (_.isFunction(originalUnobserve)) {
    originalUnobserve = originalUnobserve.bind(observer);
  }
  observer.unobserve = function(match, listener, ...unobserveArgs): void {
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
    _.remove(matchListenerPairs, {
      match,
      listener
    });
    originalUnobserve(...unobserveArgs);
  };

  let originalDisconnect = observer.disconnect;
  originalDisconnect = originalDisconnect.bind(observer);
  observer.disconnect = function(): void {
    originalDisconnect();
    matchListenerPairs = [];
  };

  return observer;
});
