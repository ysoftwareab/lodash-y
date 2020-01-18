module.exports = {
  root: false,
  extends: [
    'firecloud/configs/browser.js'
  ],
  env: {
    node: false
  },
  rules: {
    'import/prefer-default-export': 'off'
  }
};
