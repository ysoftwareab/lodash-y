/// <reference types="resize-observer-browser" />
declare const _default: {
    CustomEvent: {
        new <T>(typeArg: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
        prototype: CustomEvent<any>;
    };
    IntersectionObserver: {
        new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
        prototype: IntersectionObserver;
    };
    MutationObserver: {
        new (callback: MutationCallback): MutationObserver;
        prototype: MutationObserver;
    };
    ResizeObserver: typeof ResizeObserver;
};
export default _default;
