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
<<<<<<< HEAD
    'linebreak-style': 0,
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: false,
        ClassDeclaration: false,
        ArrowFunctionExpression: false,
        FunctionExpression: false,
      },
    }],
=======
    linebreak-style: 0,
>>>>>>> 0edacc83d656cc7e1e984d58cea960d325d1e98e
  },
};
