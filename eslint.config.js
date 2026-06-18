import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import imports from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importsSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import { ignore } from "./ignore.js"

const compat = new FlatCompat()

/** @type {import('eslint').ESLint.Config[]} */
export default [
  { ignores: [ignore] },
  { ignores: ["**/old/*", "**/apis/*"] },
  js.configs.recommended,
  ...compat.extends(
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
  ),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: { import: imports, "import-sort": importsSort },
    rules: {
      "no-undef": "off",
      "no-dupe-keys": "error",
      "no-unused-vars": "off",
      "no-restricted-imports": [
        "error",
        { paths: ["src"], patterns: ["../*"] },
      ],
      "object-shorthand": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": ["error", { considerComments: true }],
      "import/no-duplicates": "error",
      "import/no-named-default": "error",
      "import-sort/exports": "error",
      "import-sort/imports": [
        "error",
        {
          groups: [
            [String.raw`^\u0000`],
            [
              "^node:",
              String.raw`^@?\w`,
              "^",
              String.raw`^\.`,
              String.raw`^node:.*\u0000$`,
              String.raw`^@?\w.*\u0000$`,
              String.raw`\u0000$`,
              String.raw`^\..*\u0000$`,
            ],
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-boolean-value": ["error", "never", { always: [] }],
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      "react/no-string-refs": "error",
      "react/no-unknown-property": "error",
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/no-find-dom-node": "warn",
      "react/self-closing-comp": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  ...compat.extends("prettier"),
]
