import _ from 'lodash';
import globalThis from './.global-this';

export type EventSourceType = EventSourceCustomEvent['type'];

export type EventSourceDetail = EventSourceCustomEvent['detail'];

export type EventSourceListener = (eventDetail: EventSourceDetail) => void;

export class EventSourceCustomEvent<T = any> extends globalThis.CustomEvent<T> {
}

/**
 * EventSource implements a core subset of an EventEmitter for the browser runtime.
 */
export class EventSource {
  _element = document.createElement('div');

  _listeners = [] as {
    type: EventSourceType;
    listener: EventSourceListener;
    options: AddEventListenerOptions;
    listenerProxy: EventListener;
  }[];

  _addEventListener(type: EventSourceType, listener: EventSourceListener, options?: AddEventListenerOptions): void {
    _.defaults(options, {
      capture: true,
      passive: true
    });
    let listenerProxy = function(event: EventSourceCustomEvent | EventSourceDetail): void {
      let eventDetail: EventSourceDetail;
      if (event instanceof EventSourceCustomEvent) {
        eventDetail = event.detail;
      } else {
        eventDetail = event;
      }

      listener(eventDetail);
    };

    this._listeners.push({
      type,
      listener,
      options,
      listenerProxy
    });
    this._element.addEventListener(type, listenerProxy, options);
  }

  _removeEventListener(type: EventSourceType, listener: EventSourceListener, options?: AddEventListenerOptions): void {
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
   */
  on(type: EventSourceType, listener: EventSourceListener): void {
    this._addEventListener(type, listener);
  }

  /**
   * Add a listener for a specific event type, that will only be called once.
   */
  once(type: EventSourceType, listener: EventSourceListener): void {
    let options = {
      once: true
    };

    this._addEventListener(type, listener, options);
  }

  /**
   * Remove a listener for a specific event type.
   */
  off(type: EventSourceType, listener: EventSourceListener): void {
    this._removeEventListener(type, listener);
  }

  /**
   * Emit an event and call relevant listeners.
   */
  emit(eventOrType: string | CustomEvent, detail: EventSourceDetail): void {
    let event: CustomEvent;

    if (eventOrType instanceof CustomEvent) {
      event = eventOrType;
    } else {
      event = new EventSourceCustomEvent(eventOrType, {
        detail
      });
    }

    this._element.dispatchEvent(event);
  }
}
