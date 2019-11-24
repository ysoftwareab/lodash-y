import { ReuseObserver, ReuseObserverCallbackFn } from './reuse-observer';
export declare class EventTargetObserver implements ReuseObserver {
    _cb: any;
    _cache: {
        target: Node;
        type: string;
        capture: boolean;
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
