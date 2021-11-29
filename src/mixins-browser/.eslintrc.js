module.exports = {
  root: false,
  extends: [
    'y/configs/browser.js'
  ],
  env: {
    node: false
  },
  rules: {
    'import/prefer-default-export': 'off'
  }
};
