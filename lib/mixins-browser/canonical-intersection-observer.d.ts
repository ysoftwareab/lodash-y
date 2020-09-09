import { Observer, ReuseObserverCallbackFn } from './reuse-observer';
export declare class CanonicalIntersectionObserver implements Observer {
    _cb: any;
    _cache: {
        element: Element;
        options: IntersectionObserverInit;
        observer: IntersectionObserver;
    }[];
    constructor(cb: ReuseObserverCallbackFn);
    observe(element: Element, options: IntersectionObserverInit): void;
    unobserve(element: Element, options: IntersectionObserverInit): void;
    disconnect(): void;
}
