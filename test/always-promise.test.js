import _ from '../src';

describe('alwaysPromise', function() {
  it('returns the input Promise', function() {
    let pIn = Promise.resolve();
    let pOut = _.alwaysPromise(pIn);
    expect(pIn).toBe(pOut);
  });

  it('returns the input Promise-like (object)', function() {
    let pIn = {then: _.noop};
    let pOut = _.alwaysPromise(pIn);
    expect(pIn).toBe(pOut);
  });

  it('returns the input Promise-like (function)', function() {
    // eslint-disable-next-line no-empty-function, lodash/prefer-noop
    let pIn = function() {};
    pIn.then = _.noop;
    let pOut = _.alwaysPromise(pIn);
    expect(pIn).toBe(pOut);
  });

  it('returns a Promise for anything else that resolves to the input', async function() {
    let inputs = [
      undefined,
      0,
      '',
      true,
      _.noop,
      {}
    ];

    await Promise.all(_.map(inputs, async function(input) {
      let output = await _.alwaysPromise(input);
      expect(output).toBe(input);
    }));
  });
});
