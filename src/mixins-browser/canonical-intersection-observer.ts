import _ from 'lodash';
import globalThis from './.global-this';

export class CanonicalIntersectionObserver {
  _cb = undefined;

  _observerPairs: {
    element: Element;
    options: IntersectionObserverInit;
    observer: IntersectionObserver;
  }[] = [];

  constructor(cb) {
    this._cb = cb;
  }

  observe(element: Element, options: IntersectionObserverInit): void {
    let alreadyObserving = _.some(this._observerPairs, function(observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });
    if (alreadyObserving) {
      return;
    }

    let observerPair = _.find(this._observerPairs, function(observerPair) {
      return observerPair.options === options;
    });
    let observer: IntersectionObserver;
    if (_.isUndefined(observerPair)) {
      observer = new globalThis.IntersectionObserver((entries) => {
        this._cb(entries, this);
      }, options);
    } else {
      ({
        observer
      } = observerPair);
    }

    observer.observe(element);
    this._observerPairs.push({
      element,
      options,
      observer
    });
  }

  unobserve(element: Element, options: IntersectionObserverInit): void {
    let observerPairs = _.filter(this._observerPairs, function(observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });

    _.forEach(observerPairs, function({element, observer}) {
      observer.unobserve(element);
    });

    // eslint-disable-next-line lodash/prefer-immutable-method
    _.remove(this._observerPairs, function(observerPair) {
      return observerPair.element === element && observerPair.options === options;
    });
  }

  disconnect(): void {
    let observers = _.map(this._observerPairs, function(observerPair) {
      return observerPair.observer;
    });
    observers = _.uniq(observers);
    _.forEach(observers, function(observer) {
      observer.disconnect();
    });
    this._observerPairs = [];
  }
}
