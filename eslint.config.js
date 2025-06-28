import pkg from "@eslint/js";
const { defineConfig } = pkg;

import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export const baseConfig = defineConfig({
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", "node_modules", "coverage"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    react: reactPlugin,
    import: importPlugin,
    "jsx-a11y": jsxA11y,
    "@typescript-eslint": tsEslint,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  extends: [
    "eslint:recommended",
    tsEslint.configs.recommended,
    reactPlugin.configs.recommended,
    reactHooks.configs.recommended,
    reactRefresh.configs.vite,
    prettierConfig,
    jsxA11y.configs.recommended,
  ],
  rules: {
    eqeqeq: ["error"],
    "react/self-closing-comp": ["error"],
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: true,
        noSortAlphabetically: false,
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        ignoreCase: true,
      },
    ],
    "import/newline-after-import": ["error"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
});

export default baseConfig;
