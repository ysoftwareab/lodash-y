import { Observer, ReuseObserverCallbackFn } from './reuse-observer';
export declare class IntervalObserver implements Observer {
    _cb: any;
    _cache: {
        interval: number;
        intervalId: ReturnType<typeof setInterval>;
    }[];
    constructor(cb: ReuseObserverCallbackFn);
    observe(args: {
        interval: number;
    }): void;
    unobserve(args: {
        interval: number;
    }): void;
    disconnect(): void;
}
