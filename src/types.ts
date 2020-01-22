import * as _UT from 'utility-types';

import {
  Fn
} from './types-functions';


export interface Deferred<TValue> {

  /**
   * The internal promise.
   */
  promise: Promise<TValue>;

  /**
   * The state of the promise.
   */
  state: 'pending' | 'resolved' | 'rejected';

  /**
   * The resolve callback of the promise.
   */
  resolve: Fn<void, [TValue?]>;

  /**
   * The reject callback of the promise.
   */
  reject: Fn<void, [Error]>;

  /**
   * The value that the promise resolved with.
   */
  value?: TValue;

  /**
   * The error that the promise rejected with.
   */
  err?: Error;
}

// -----------------------------------------------------------------------------

// https://github.com/piotrwitek/utility-types is a good library
// but some types are not properly tested
// e.g. Primitive didn't have undefined and null until 2019-10-21, since added in 2019-04-02
export let UT = _UT;

export * from './types-callbacks';

export * from './types-classes';

export * from './types-core';

export * from './types-functions';

export * from './types-json';

export * from './types-struct';

export * from './types-struct-keys';
