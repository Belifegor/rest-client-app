// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  js.configs.recommended,
  eslintPluginPrettier,

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.{ts,page.tsx}"],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },

  { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"] },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-mixed-spaces-and-tabs": "error",
      "space-before-blocks": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },

  {
    files: ["src/lib/codegen/langs/**/*.{ts,js}"],
    rules: {
      quotes: "off",
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
        },
      ],
    },
  },
];

export default eslintConfig;
