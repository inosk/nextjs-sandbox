// ESLint flat config for Next.js + TypeScript + React
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import storybook from "eslint-plugin-storybook";
import nextPlugin from "@next/eslint-plugin-next";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: dirname });

export default tseslint.config(
  // Ignores
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "coverage",
      "storybook-static",
      "next-env.d.ts",
      // Config files that shouldn't be type-checked
      "eslint.config.mjs",
    ],
  },

  // Next.js Core Web Vitals (compat from eslint-config-next)
  ...compat.config({ extends: ["next/core-web-vitals"] }),

  // Base JS + TS recommended
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Enable type-aware lint rules for TS files
  {
    files: ["**/*.{ts,tsx}", "*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        // Use project tsconfigs for type-aware rules
        project: ["./tsconfig.json", "./.storybook/tsconfig.json"],
        tsconfigRootDir: dirname,
      },
    },
  },
  // Restrict type-aware presets strictly to TS files (strict)
  ...tseslint.configs.strictTypeChecked.map((c) => ({
    ...c,
    files: ["src/**/*.{ts,tsx}", "*.{ts,tsx}"],
    ignores: ["src/stories/**/*"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((c) => ({
    ...c,
    files: ["src/**/*.{ts,tsx}", "*.{ts,tsx}"],
    ignores: ["src/stories/**/*"],
  })),

  // Project preference: allow `type` for object shapes
  {
    files: ["**/*.{ts,tsx}", "*.{ts,tsx}"],
    rules: { "@typescript-eslint/consistent-type-definitions": "off" },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/stories/**/*"],
    rules: { "@typescript-eslint/consistent-type-definitions": ["error", "type"] },
  },

  // React + Hooks + a11y
  {
    files: ["**/*.{js,jsx,ts,tsx}", "*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      storybook,
      "@next/next": nextPlugin,
    },
    rules: {
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // A small sample from Next.js plugin
      "@next/next/no-img-element": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // Storybook files
  {
    files: [
      ".storybook/**/*.{js,jsx,ts,tsx}",
      "src/stories/**/*.{js,jsx,ts,tsx}",
      "**/*.stories.@(js|jsx|ts|tsx)",
      "**/*.story.@(js|jsx|ts|tsx)",
    ],
    plugins: { storybook, react: reactPlugin },
    rules: {
      // Story content often includes raw quotes/characters
      "react/no-unescaped-entities": "off",
    },
  }
);
