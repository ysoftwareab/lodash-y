module.exports = {
  root: true,

  extends: [
    'firecloud/node'
  ]
};

let tsConfig = {
  files: [
    '*.ts'
  ],

  extends: [
    'firecloud/configs/typescript'
  ],

  rules: {
    // FIXME gives Allocation failed - JavaScript heap out of memory
    'firecloud/order-imports': 'off'
  }
};

// temporary workaround because overrides doesn't allow extends (yet!)
// see https://github.com/eslint/eslint/issues/8813#issuecomment-456034732

// let _ = require('lodash-firecloud');
let _ = require('.');

let _defaultsValues = function(...objs) {
  let keys = _.reduce(objs, function(acc, obj, _index) {
    acc = _.concat(acc, _.keys(obj));
    acc = _.uniq(acc);
    return acc;
  }, []);

  let result = _.reduce(keys, function(acc, key, _index) {
    let objsKey = _.map(objs, key);

    if (_.some(objsKey, _.isPlainObject)) {
      acc[key] = _.defaults({}, ...objsKey);
    } else {
      acc[key] = _.find(objsKey, function(value) {
        return !_.isUndefined(value);
      });
    }

    return acc;
  }, {});

  return result;
};

delete tsConfig.extends;
let ecfTypescript = require('eslint-config-firecloud/configs/typescript');

delete ecfTypescript.extends;
let tsEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');

tsConfig = _defaultsValues(tsConfig, ecfTypescript, tsEslintRecommended);

module.exports.overrides = [
  tsConfig
];
