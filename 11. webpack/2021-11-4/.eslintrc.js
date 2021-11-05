module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015
  },
  env: {
    browser: true
  },
  // 启动规则和各自错误级别
  rules: {
    "indent": "off",
    "quotes": "off",
    "no-console": "error"
  }
}