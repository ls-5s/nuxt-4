module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  ignorePatterns: [
    ".nuxt",
    ".output",
    "dist",
    "node_modules",
  ],
};
