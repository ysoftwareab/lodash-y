import _ from 'lodash';

export class EventTargetObserver {
  _cb = undefined;

  _cache = [];

  constructor(cb) {
    this._cb = cb;
  }

  observe(
    args: {
      target: Node,
      type: string
    },
    options: AddEventListenerOptions = {}
  ): void {
    let {
      target,
      type
    } = args;
    let cacheEntry = _.find(this._cache, {
      target,
      type,
      capture: options.capture
    });
    let isObserving = !_.isUndefined(cacheEntry);
    if (isObserving) {
      return;
    }
    let listener = (e): void => {
      let entries = [
        e
      ];
      this._cb(entries);
    };
    this._cache.push({
      target,
      type,
      capture: options.capture
    });
    target.addEventListener(type, listener, options);
  }

  unobserve(
    args: {
      target: Node,
      type: string
    },
    options: EventListenerOptions = {}
  ): void {
    let {
      target,
      type
    } = args;
    let cacheEntry = _.find(this._cache, {
      target,
      type,
      capture: options.capture
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
