import _ from '../../src';

// -----------------------------------------------------------------------------

describe('envsubst', function() {
  it('should replace $VAR pattern', function() {
    let env = {
      VAR: 'key'
    };
    let texts = [
      '$VAR',
      'prefix$VAR',
      'prefix $VAR',
      '$VARsuffix',
      '$VAR suffix'
    ];
    let results = _.map(texts, function(text) {
      return _.envsubst(text, env);
    });
    expect(results).toMatchSnapshot();
  });

  // eslint-disable-next-line no-template-curly-in-string
  it('should replace ${VAR} pattern', function() {
    let env = {
      VAR: 'key'
    };
    /* eslint-disable no-template-curly-in-string */
    let texts = [
      '${VAR}',
      'prefix${VAR}',
      'prefix ${VAR}',
      '${VAR}suffix',
      '${VAR} suffix'
    ];
    /* eslint-enable no-template-curly-in-string */
    let results = _.map(texts, function(text) {
      return _.envsubst(text, env);
    });
    expect(results).toMatchSnapshot();
  });
});
