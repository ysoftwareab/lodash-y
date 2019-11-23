export declare class CanonicalIntersectionObserver {
    _cb: any;
    _observerPairs: {
        element: Element;
        options: IntersectionObserverInit;
        observer: IntersectionObserver;
    }[];
    constructor(cb: any);
    observe(element: Element, options: IntersectionObserverInit): void;
    unobserve(element: Element, options: IntersectionObserverInit): void;
    disconnect(): void;
}
