import _ from 'lodash';

import {
  ReuseObserver,
  ReuseObserverCallbackFn
} from './reuse-observer';

export class EventTargetObserver implements ReuseObserver {
  _cb = undefined;

  _cache = [] as {
    target: Node;
    type: string;
    capture: AddEventListenerOptions['capture'];
    listener: EventListener;
  }[];

  constructor(cb: ReuseObserverCallbackFn) {
    this._cb = cb;
  }

  observe(
    args: {
      target: Node;
      type: string;
    },
    options: AddEventListenerOptions = {}
  ): void {
    let {
      target,
      type
    } = args;
    let cacheEntry = _.find(this._cache, function(cacheEntry) {
      return cacheEntry.target === target && cacheEntry.type === type && cacheEntry.capture === options.capture;
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (isObserving) {
      return;
    }
    let listener = (e: Event): void => {
      let entries = [
        e
      ];
      this._cb(entries);
    };
    this._cache.push({
      target,
      type,
      capture: options.capture,
      listener
    });
    target.addEventListener(type, listener, options);
  }

  unobserve(
    args: {
      target: Node;
      type: string;
    },
    options: EventListenerOptions = {}
  ): void {
    let {
      target,
      type
    } = args;
    let cacheEntry = _.find(this._cache, function(cacheEntry) {
      return cacheEntry.target === target && cacheEntry.type === type && cacheEntry.capture === options.capture;
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (!isObserving) {
      return;
    }
    target.removeEventListener(type, cacheEntry.listener, options);
    // eslint-disable-next-line lodash/prefer-immutable-method
    _.pull(this._cache, cacheEntry);
  }

  disconnect(): void {
    _.forEach(this._cache, ({
      target,
      type,
      capture
    }) => {
      this.unobserve({
        type,
        target
      }, {
        capture
      });
    });
  }
}
