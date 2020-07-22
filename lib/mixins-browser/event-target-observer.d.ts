import { Observer, ReuseObserverCallbackFn } from './reuse-observer';
export declare class EventTargetObserver implements Observer {
    _cb: any;
    _cache: {
        target: Node;
        type: string;
        capture: AddEventListenerOptions['capture'];
        listener: EventListener;
    }[];
    constructor(cb: ReuseObserverCallbackFn);
    observe(args: {
        target: Node;
        type: string;
    }, options?: AddEventListenerOptions): void;
    unobserve(args: {
        target: Node;
        type: string;
    }, options?: EventListenerOptions): void;
    disconnect(): void;
}
