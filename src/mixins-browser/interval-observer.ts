import _ from 'lodash';

export class IntervalObserver {
  _cb = undefined;

  _cache = [];

  constructor(cb) {
    this._cb = cb;
  }

  observe({interval}): void {
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

  unobserve({interval}): void {
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
      this.unobserve(interval);
    });
  }
}
