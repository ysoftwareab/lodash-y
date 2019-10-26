/* eslint-disable max-classes-per-file */

import CustomEvent from 'custom-event';
import _ from 'lodash';

export class EventSourceCustomEvent extends CustomEvent {
}

/**
 * EventSource implements a core subset of an EventEmitter for the browser runtime.
 */
export class EventSource {
  _element = document.createElement('div');

  _listeners = [];

  /**
   * @param {string} type
   * @param {Function} listener
   * @param {Object} options
   * @param {boolean} [options.capture=true]
   * @param {boolean} [options.once]
   * @param {boolean} [options.passive=true]
   * @returns {void}
   */
  _addEventListener(type, listener, options = {}) {
    _.defaults(options, {
      capture: true,
      passive: true
    });

    let listenerProxy = async function(event) {
      if (event instanceof EventSourceCustomEvent) {
        event = event.detail;
      }

      await listener(event);
    };

    this._listeners.push({
      type,
      listener,
      options,
      listenerProxy
    });
    this._element.addEventListener(type, listenerProxy, options);
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @param {Object} options
   * @param {boolean} [options.capture=true]
   * @param {boolean} [options.once]
   * @param {boolean} [options.passive=true]
   * @returns {void}
   */
  _removeEventListener(type, listener, options = {}) {
    _.defaults(options, {
      capture: true,
      passive: true
    });

    let existingListener = _.find(this._listeners, {
      type,
      listener,
      options
    });

    if (_.isUndefined(existingListener)) {
      return;
    }

    let {
      listenerProxy
    } = existingListener;

    // eslint-disable-next-line lodash/prefer-immutable-method
    _.pull(this._listeners, existingListener);
    this._element.removeEventListener(type, listenerProxy, options);
  }

  /**
   * Add a listener for a specific event type.
   *
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  on(type, listener) {
    return this._addEventListener(type, listener);
  }

  /**
   * Add a listener for a specific event type, that will only be called once.
   *
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  once(type, listener) {
    let options = {
      once: true
    };

    return this._addEventListener(type, listener, options);
  }

  /**
   * Remove a listener for a specific event type.
   *
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  off(type, listener) {
    return this._removeEventListener(type, listener);
  }

  /**
   * Emit an event and call relevant listeners.
   *
   * @param {string | Event} eventOrType
   * @param {Object} [detail={}]
   * @returns {void}
   */
  emit(eventOrType, detail = {}) {
    let event;

    if (eventOrType instanceof Event) {
      event = eventOrType;
    } else {
      event = new EventSourceCustomEvent(eventOrType, {
        detail
      });
    }

    this._element.dispatchEvent(event);
  }
}
