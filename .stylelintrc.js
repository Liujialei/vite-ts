module.exports = {
  processors: [],
  plugins: [],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recommended-vue/scss",
  ],
  customSyntax: "postcss-html",
  ignoreFiles: ["node_modules/**", "dist/**"],
  rules: {
    indentation: 2,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["responsive", "tailwind"],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "value-keyword-case": null,
  },
};
