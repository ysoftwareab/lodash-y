import _ from 'lodash';

export class CanonicalIntersectionObserver extends IntersectionObserver {
  _cb = undefined;

  _observerPairs = [];

  constructor(cb) {
    super(_.noop);
    this._cb = cb;
  }

  observe(element, options) {
    let alreadyObserving = _.some(this._observerPairs, {
      element,
      options
    });
    if (alreadyObserving) {
      return;
    }

    let observer = _.find(this._observerPairs, {
      options
    });
    if (_.isUndefined(observer)) {
      observer = new IntersectionObserver((entries) => {
        this._cb(entries, this);
      }, options);
    }

    observer.observe(element);
    this._observerPairs.push({
      element,
      options,
      observer
    });
  }

  unobserve(element, options) {
    let observerPairs = _.filter(this._observerPairs, {
      element,
      options
    });

    _.forEach(observerPairs, function({element, _options, observer}) {
      observer.unobserve(element);
    });

    // eslint-disable-next-line lodash/prefer-immutable-method
    _.remove(this._observerPairs, {
      element,
      options
    });
  }

  disconnect() {
    let observers = _.map(this._observerPairs, 'observers');
    observers = _.uniq(observers);
    _.forEach(observers, function(observer) {
      observer.disconnect();
    });
    this._observerPairs = [];
  }
}
