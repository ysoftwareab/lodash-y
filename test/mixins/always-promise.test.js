import _ from '../../src';

describe('alwaysPromise', function() {
  it('returns a Promise that resolves the same way as the input Promise', async function() {
    let result = Symbol('result');
    let pIn = Promise.resolve(result);
    let pOut = _.alwaysPromise(pIn);
    expect(await pIn).toBe(result);
    expect(await pOut).toBe(result);
  });

  it('returns a Promise for anything else that resolves to the input', async function() {
    let emptyObj = {};
    let inputs = [
      undefined,
      0,
      '',
      true,
      _.noop,
      emptyObj
    ];

    await Promise.all(_.map(inputs, async function(input) {
      let output = await _.alwaysPromise(input);
      expect(output).toBe(input);
    }));
  });
});
