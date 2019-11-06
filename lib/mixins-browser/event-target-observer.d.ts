export declare class EventTargetObserver {
    _cb: any;
    _cache: any[];
    constructor(cb: any);
    observe({ target, type }: {
        target: Node;
        type: string;
    }, options?: AddEventListenerOptions): void;
    unobserve({ target, type }: {
        target: Node;
        type: string;
    }, options?: EventListenerOptions): void;
    disconnect(): void;
}
