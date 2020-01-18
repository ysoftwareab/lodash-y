import _ from '../../src';

// -----------------------------------------------------------------------------

describe('isAsyncFunction', function() {
  it("should return 'true' for sync functions", function() {
    expect(_.isAsyncFunction(async function() {
      //
    })).toBe(true);
  });

  it("should return 'false' for sync functions", function() {
    // eslint-disable-next-line lodash/prefer-noop
    expect(_.isAsyncFunction(function() {
      //
    })).toBe(false);
  });
});
