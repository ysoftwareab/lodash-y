import _ from 'lodash';

import {
  Observer,
  ReuseObserverCallbackFn
} from './reuse-observer';

export class IntervalObserver implements Observer {
  _cb = undefined;

  _cache = [] as {
    interval: number;
    intervalId: NodeJS.Timeout;
  }[];

  constructor(cb: ReuseObserverCallbackFn) {
    this._cb = cb;
  }

  observe(args: {
    interval: number;
  }): void {
    let {
      interval
    } = args;
    let cacheEntry = _.find(this._cache, function(cacheEntry) {
      return cacheEntry.interval === interval;
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (isObserving) {
      return;
    }
    let intervalId = setInterval(() => {
      let entries = [{
        interval
      }];
      this._cb(entries);
    }, interval);
    this._cache.push({
      interval,
      intervalId
    });
  }

  unobserve(args: {
    interval: number;
  }): void {
    let {
      interval
    } = args;
    let cacheEntry = _.find(this._cache, function(cacheEntry) {
      return cacheEntry.interval === interval;
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (!isObserving) {
      return;
    }
    clearInterval(cacheEntry.intervalId);
    // eslint-disable-next-line lodash/prefer-immutable-method
    _.pull(this._cache, cacheEntry);
  }

  disconnect(): void {
    _.forEach(this._cache, ({interval}) => {
      this.unobserve({interval});
    });
  }
}
