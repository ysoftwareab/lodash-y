import globalThis from './.global-this';
export declare type EventSourceListener = (eventDetail: EventSourceCustomEvent['detail']) => void;
export declare class EventSourceCustomEvent<T = any> extends globalThis.CustomEvent<T> {
}
/**
 * EventSource implements a core subset of an EventEmitter for the browser runtime.
 */
export declare class EventSource {
    _element: HTMLDivElement;
    _listeners: any[];
    _addEventListener(type: string, listener: EventSourceListener, options?: AddEventListenerOptions): void;
    _removeEventListener(type: string, listener: EventSourceListener, options?: AddEventListenerOptions): void;
    /**
     * Add a listener for a specific event type.
     */
    on(type: string, listener: EventSourceListener): void;
    /**
     * Add a listener for a specific event type, that will only be called once.
     */
    once(type: string, listener: EventSourceListener): void;
    /**
     * Remove a listener for a specific event type.
     */
    off(type: string, listener: EventSourceListener): void;
    /**
     * Emit an event and call relevant listeners.
     */
    emit(eventOrType: string | Event, detail: EventSourceCustomEvent['detail']): void;
}
