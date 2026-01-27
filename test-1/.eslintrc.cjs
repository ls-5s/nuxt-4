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
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
