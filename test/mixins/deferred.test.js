/* eslint-disable jest/no-test-callback */
import _ from '../../src';

describe('deferred', function() {
  it('resolves correctly', async function() {
    let ok = Symbol('ok');
    let d = _.deferred();
    d.resolve(ok);

    await d.promise;
    expect(d.state).toStrictEqual('resolved');
    expect(await d.promise).toBe(ok);
    expect(d.value).toBe(ok);
  });

  it('resolves correctly with a given promise', async function() {
    let ok = Symbol('ok');
    let d = _.deferred(Promise.resolve(ok));
    await d.promise;

    expect(d.state).toStrictEqual('resolved');
    expect(await d.promise).toBe(ok);
    expect(d.value).toBe(ok);
  });

  it('rejects correctly', async function() {
    let err = new Error();
    let d = _.deferred();
    d.reject(err);

    await expect(d.promise).rejects.toBe(err);
    expect(d.err).toBe(err);
    expect(d.state).toStrictEqual('rejected');
  });


  it('rejects correctly with a given promise', async function() {
    let err = new Error();
    let d = _.deferred(Promise.reject(err));

    await expect(d.promise).rejects.toBe(err);
    expect(d.state).toStrictEqual('rejected');
    expect(d.err).toBe(err);
  });
});
