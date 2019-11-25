/// <reference types="node" />
import { Observer, ReuseObserverCallbackFn } from './reuse-observer';
export declare class IntervalObserver implements Observer {
    _cb: any;
    _cache: {
        interval: number;
        intervalId: NodeJS.Timeout;
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
