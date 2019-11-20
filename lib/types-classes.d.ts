/**
 * A class type (i.e. A constructor type).
 */
export declare type Class = {
    new (...args: any[]): any;
};
/**
 * Construct a class type with the static properties of TClass except for those in type TKey.
 */
export declare type OmitClassStatic<TClass extends Class, TKey extends keyof any> = TClass extends {
    new (...args: infer TArgs): infer TInstance;
} ? ({
    new (...args: TArgs): TInstance;
} & Omit<TClass, TKey>) : never;
/**
 * Construct a class type with the instance properties of TClass except for those in type TKey.
 */
export declare type OmitClassInstance<TClass extends Class, TKey extends keyof any> = TClass extends {
    new (...args: infer TArgs): infer TInstance;
} ? ({
    new (...args: TArgs): Omit<TInstance, TKey>;
} & Omit<TClass, 'prototype'> & {
    prototype: Omit<TInstance, TKey>;
}) : never;
