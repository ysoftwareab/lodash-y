import _ from 'lodash';

export class IntervalObserver {
  _cb = undefined;

  _cache = [];

  constructor(cb) {
    this._cb = cb;
  }

  observe({interval}) {
    let cacheEntry = _.find(this._cache, {
      interval
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

  unobserve({interval}) {
    let cacheEntry = _.find(this._cache, {
      interval
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (!isObserving) {
      return;
    }
    clearInterval(cacheEntry.intervalId);
    // eslint-disable-next-line lodash/prefer-immutable-method
    _.pull(this._cache, cacheEntry);
  }

  disconnect() {
    _.forEach(this._cache, ({interval}) => {
      this.unobserve(interval);
    });
  }
}
