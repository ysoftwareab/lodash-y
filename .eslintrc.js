let _ = require('lodash');

module.exports = {
  root: true,

  extends: [
    'firecloud/node'
  ],

  rules: {
    'max-classes-per-file': 'off'
  },

  overrides: [{
    files: [
      '*.ts'
    ],

    extends: [
      'firecloud/configs/typescript'
    ],

    rules: {
      // FIXME gives Allocation failed - JavaScript heap out of memory
      'firecloud/order-imports': 'off',

      'lodash/prefer-lodash-method': 'error'
    }
  }]
};
