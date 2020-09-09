import globalThis from './.global-this';
export declare type EventSourceType = EventSourceCustomEvent['type'];
export declare type EventSourceDetail = EventSourceCustomEvent['detail'];
export declare type EventSourceListener = (eventDetail: EventSourceDetail) => void;
export declare class EventSourceCustomEvent<T = any> extends globalThis.CustomEvent<T> {
}
/**
 * EventSource implements a core subset of an EventEmitter for the browser runtime.
 */
export declare class EventSource {
    _element: HTMLDivElement;
    _listenerInfos: {
        type: EventSourceType;
        listener: EventSourceListener;
        options: AddEventListenerOptions;
        listenerProxy: EventListener;
    }[];
    _addEventListener(type: EventSourceType, listener: EventSourceListener, options?: AddEventListenerOptions): void;
    _removeEventListener(type: EventSourceType, listener: EventSourceListener, options?: AddEventListenerOptions): void;
    /**
     * Add a listener for a specific event type.
     */
    on(type: EventSourceType, listener: EventSourceListener): void;
    /**
     * Add a listener for a specific event type, that will only be called once.
     */
    once(type: EventSourceType, listener: EventSourceListener): void;
    /**
     * Remove a listener for a specific event type.
     */
    off(type: EventSourceType, listener: EventSourceListener): void;
    /**
     * Emit an event and call relevant listeners.
     */
    emit(eventOrType: string | CustomEvent, detail: EventSourceDetail): void;
}
