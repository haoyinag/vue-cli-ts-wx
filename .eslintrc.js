module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    wx: true,
    document: true,
    localStorage: true,
    window: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // "@vue/prettier"
    // "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-sparse-arrays": 0,
    "no-unused-vars": 0,
    "no-useless-escape": 0,
    "prefer-const": "off",
    // "prefer-const": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off", // 针对this做校验
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/camelcase": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-function": "off",
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-var-requires": 0,
  },
};
