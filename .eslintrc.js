module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-use-before-define': 0,
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: false,
        ClassDeclaration: false,
        ArrowFunctionExpression: false,
        FunctionExpression: false,
      },
    }],
  },
};
