export declare class EventTargetObserver {
    _cb: any;
    _cache: any[];
    constructor(cb: any);
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
