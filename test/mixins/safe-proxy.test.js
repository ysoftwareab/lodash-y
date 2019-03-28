import _ from '../../src';

describe('safeProxy', function() {
  it('forwards the properties of the target object', function() {
    let target = {
      foo: 'foo',
      bar: 'bar'
    };
    let proxy = _.safeProxy(target);
    expect(_.keys(proxy)).toStrictEqual(_.keys(target));
    expect(proxy.constructor).toStrictEqual(target.constructor);
  });

  it('forwards (some) internals of the target object', function() {
    let target = {};
    let proxy = _.safeProxy(target);
    expect(proxy.constructor).toStrictEqual(target.constructor);
    expect(proxy.length).toStrictEqual(target.length);
  });

  it('throws on non-string properties', async function() {
    let target = {
      notAString: true
    };
    let proxy = _.safeProxy(target);

    expect(function() {
      return proxy.foo;
    }).toThrow(/foo is undefined/);

    expect(function() {
      return proxy.notAString;
    }).toThrow(/notAString is undefined/);
  });
});
