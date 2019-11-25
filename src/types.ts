import * as _UT from 'utility-types';

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
