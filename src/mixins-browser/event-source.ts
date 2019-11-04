import _ from 'lodash';
import globalThis from './.global-this';

export type EventSourceListener = (eventDetail: EventSourceCustomEvent['detail']) => void;

export class EventSourceCustomEvent<T = any> extends globalThis.CustomEvent<T> {
}

/**
 * EventSource implements a core subset of an EventEmitter for the browser runtime.
 */
export class EventSource {
  _element = document.createElement('div');

  _listeners = [];

  _addEventListener(type: string, listener: EventSourceListener, options?: AddEventListenerOptions): void {
    _.defaults(options, {
      capture: true,
      passive: true
    });
    let listenerProxy = function(
      event: EventSourceCustomEvent | EventSourceCustomEvent['detail']
    ): void {
      if (event instanceof EventSourceCustomEvent) {
        event = event.detail;
      }

      listener(event);
    };

    this._listeners.push({
      type,
      listener,
      options,
      listenerProxy
    });
    this._element.addEventListener(type, listenerProxy, options);
  }

  _removeEventListener(type: string, listener: EventSourceListener, options?: AddEventListenerOptions): void {
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
   * @param type
   * @param listener
   * @returns .
   */
  on(type: string, listener: EventSourceListener): void {
    this._addEventListener(type, listener);
  }

  /**
   * Add a listener for a specific event type, that will only be called once.
   *
   * @param type
   * @param listener
   * @returns .
   */
  once(type: string, listener: EventSourceListener): void {
    let options = {
      once: true
    };

    this._addEventListener(type, listener, options);
  }

  /**
   * Remove a listener for a specific event type.
   *
   * @param type
   * @param listener
   * @returns .
   */
  off(type: string, listener: EventSourceListener): void {
    this._removeEventListener(type, listener);
  }

  /**
   * Emit an event and call relevant listeners.
   *
   * @param eventOrType
   * @param detail
   * @returns .
   */
  emit(eventOrType: string | Event, detail: EventSourceCustomEvent['detail']): void {
    let event: Event;

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
