import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    rules: {
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": [
        "error",
        {
          vars: "off",
          args: "after-used",
          caughtErrors: "all",
          ignoreRestSiblings: false,
          ignoreUsingDeclarations: false,
          reportUsedIgnorePattern: false,
        },
      ],
      "class-methods-use-this": "off",
      //"no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
