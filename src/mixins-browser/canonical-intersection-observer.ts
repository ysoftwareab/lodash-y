import _ from 'lodash';
import globalThis from './.global-this';

import {
  Observer,
  ReuseObserverCallbackFn
} from './reuse-observer';

export class CanonicalIntersectionObserver implements Observer {
  _cb = undefined;

  _cache = [] as {
    element: Element;
    options: IntersectionObserverInit;
    observer: IntersectionObserver;
  }[];

  constructor(cb: ReuseObserverCallbackFn) {
    this._cb = cb;
  }

  observe(element: Element, options: IntersectionObserverInit): void {
    let isObserving = _.some(this._cache, function(cacheEntry) {
      return cacheEntry.element === element &&
        cacheEntry.options === options;
    });
    if (isObserving) {
      return;
    }

    let cacheEntry = _.find(this._cache, function(cacheEntry) {
      return cacheEntry.options === options;
    });
    let observer: IntersectionObserver;
    if (_.isUndefined(cacheEntry)) {
      observer = new globalThis.IntersectionObserver((entries) => {
        this._cb(entries, this);
      }, options);
    } else {
      ({
        observer
      } = cacheEntry);
    }

    observer.observe(element);
    this._cache.push({
      element,
      options,
      observer
    });
  }

  unobserve(element: Element, options: IntersectionObserverInit): void {
    let cache = _.filter(this._cache, function(cacheEntry) {
      return cacheEntry.element === element &&
        cacheEntry.options === options;
    });

    _.forEach(cache, (cacheEntry) => {
      let {
        element,
        observer
      } = cacheEntry;
      observer.unobserve(element);
      // eslint-disable-next-line lodash/prefer-immutable-method
      _.pull(this._cache, cacheEntry);
    });
  }

  disconnect(): void {
    let observers = _.map(this._cache, function(cacheEntry) {
      return cacheEntry.observer;
    });
    observers = _.uniq(observers);
    _.forEach(observers, (observer) => {
      observer.disconnect();

      // eslint-disable-next-line lodash/prefer-immutable-method
      _.remove(this._cache, function(cacheEntry) {
        return cacheEntry.observer === observer;
      });
    });
  }
}
