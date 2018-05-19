// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 允许声明未使用变量
    "no-unused-vars": [0, {
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 允许混合使用spaces和tabs
    "no-mixed-spaces-and-tabs": [0],
    // 禁用缩进检查
    'indent': 'off',
    // 允许函数定义时括号前没有有空格
    "space-before-function-paren": [0, "always"],
    // 允许使用如下引号类型 `` "" ''
    "quotes": [0, "single"]
  }
}
