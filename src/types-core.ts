/**
 * An optional value of type T.
 */
export type Maybe<T = unknown> =
  | T
  | undefined;

/**
 * A value or the Promise of a value of type T.
 */
export type MaybePromise<T = unknown> =
  | T
  | Promise<T>;

/**
 * A primitive value as per https://developer.mozilla.org/en-US/docs/Glossary/Primitive .
 */
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol;
