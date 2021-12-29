module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "jest": true,
  },
  "extends": [
      "plugin:react/recommended",
      "airbnb"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types" : 0,
      "react/function-component-definition": [2,{namedComponents: "function-declaration",}],
      'react/jsx-one-expression-per-line': 'off',
  },
};
