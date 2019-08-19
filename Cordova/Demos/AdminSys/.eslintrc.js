module.exports = {
  root: true,
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': '2018',
    'sourceType': 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': [2, 'never'],
    // override default options
    'indent': 0,
    // 大括号中使用空格
    'object-curly-spacing': 'off',
    // 组件自闭
    'vue/html-self-closing': 'off',
    // 限制自定义组件的属性风格
    'vue/attribute-hyphenation': 'off',
    // 限制属性顺序
    'vue/attributes-order': 'off',
    // 限制每行允许的最多属性数量
    'vue/max-attributes-per-line': 'off',
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // {{中使用空格
    'vue/mustache-interpolation-spacing': ['error', 'never'],
    'vue/no-use-v-if-with-v-for': ['error', {
      'allowUsingIterationVar': true
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
      'ignores': []
    }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1,
      'ignores': []
    }],
  }
}
