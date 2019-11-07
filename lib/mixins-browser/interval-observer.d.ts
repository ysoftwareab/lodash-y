export declare class IntervalObserver {
    _cb: any;
    _cache: any[];
    constructor(cb: any);
    observe({ interval }: {
        interval: any;
    }): void;
    unobserve({ interval }: {
        interval: any;
    }): void;
    disconnect(): void;
}
