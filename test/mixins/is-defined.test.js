/* eslint-disable jest/no-test-callback */
import _ from '../../src';

// -----------------------------------------------------------------------------
// Utils from https://github.com/lodash/lodash/blob/d5ef319/test/utils.js

/** Used to provide falsey values to methods. */
// eslint-disable-next-line no-sparse-arrays
let falsey = [
  // eslint-disable-next-line comma-style
  ,
  // eslint-disable-next-line no-null/no-null
  null,
  undefined,
  false,
  0,
  NaN,
  ''
];

let toArgs = function(array) {
  return (function(...args) {
    return args;
  })(...array);
};

let args = toArgs([
  1,
  2,
  3
]);
let {
  slice
} = Array.prototype;
let symbol = Symbol('a');

// -----------------------------------------------------------------------------

describe('isDefined', function() {
  it('should return `false` for `undefined` values', function() {
    expect(_.isDefined(undefined)).toBe(false);
  });

  it('should return `true` for non `undefined` values', function() {
    let expected = _.map(falsey, function(value) {
      return value !== undefined;
    });

    let actual = _.map(falsey, function(value, index) {
      return index ? _.isDefined(value) : _.isDefined(undefined);
    });

    expect(actual).toMatchObject(expected);

    expect(_.isDefined(args)).toBe(true);
    expect(_.isDefined([
      1,
      2,
      23
    ])).toBe(true);
    expect(_.isDefined(true)).toBe(true);
    expect(_.isDefined(new Date())).toBe(true);
    expect(_.isDefined(new Error())).toBe(true);
    expect(_.isDefined(_)).toBe(true);
    expect(_.isDefined(slice)).toBe(true);
    expect(_.isDefined({a: 1})).toBe(true);
    expect(_.isDefined(1)).toBe(true);
    expect(_.isDefined(/x/)).toBe(true);
    expect(_.isDefined('a')).toBe(true);

    if (Symbol) {
      expect(_.isDefined(symbol)).toBe(true);
    }
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should work with `undefined` from another realm', function() {
  //   if (realm.object) {
  //     expect(_.isDefined(realm.undefined)).toBe(false);
  //   }
  // });
});
