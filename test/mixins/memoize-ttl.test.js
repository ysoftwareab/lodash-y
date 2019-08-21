import _ from '../../src';

describe('memoizeTtl', function() {
  it('should return a function that is equivalent to the original', function() {
    let values = [
      undefined,
      // eslint-disable-next-line no-null/no-null
      null,
      false,
      true,
      -Infinity,
      -1,
      0,
      1,
      Infinity,
      '',
      'string',
      _.noop
    ];

    let functions = [
      _.identity
    ];

    _.forEach(functions, function(fn) {
      let memoized = _.memoizeTtl(0, fn);
      _.forEach(values, function(value) {
        expect(memoized(value)).toStrictEqual(_.identity(value));
      });
    });
  });

  it('should not call the original function before ttl', async function() {
    let ttl = 1000;
    let acc = 0;
    let memoized = _.memoizeTtl(ttl, function() {
      acc = acc + 1;
      return acc;
    });
    expect(memoized()).toStrictEqual(1);
    expect(memoized()).toStrictEqual(1);
    await _.sleep(ttl / 2);
    expect(memoized()).toStrictEqual(1);
  });

  it('should call the original function after ttl', async function() {
    let ttl = 1000;
    let acc = 0;
    let memoized = _.memoizeTtl(ttl, function() {
      acc = acc + 1;
      return acc;
    });
    expect(memoized()).toStrictEqual(1);
    expect(memoized()).toStrictEqual(1);
    await _.sleep(ttl + ttl / 2);
    expect(memoized()).toStrictEqual(2);
  });
});
