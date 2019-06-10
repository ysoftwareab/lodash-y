// temporary workaround because overrides doesn't allow extends (yet!)
// see https://github.com/eslint/eslint/issues/8813#issuecomment-456034732
// see https://github.com/eslint/eslint/pull/11554
let {
  makeTsConfig
} = require('eslint-config-firecloud/util');

module.exports = {
  root: true,

  extends: [
    'firecloud/node'
  ],

  overrides: [
    makeTsConfig({
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
    })
  ]
};
