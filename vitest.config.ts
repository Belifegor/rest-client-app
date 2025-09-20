import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/e2e/**",
    ],
    coverage: {
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      cleanOnRerun: true,

      include: ["src/**"],
      exclude: [
        "src/components/ui/**",
        "**/node_modules/**",
        "**/.next/**",
        "**/dist/**",
        "**/build/**",
        "**/coverage/**",
        "**/*.d.ts",
        "**/__mocks__/**",
        "**/mocks/**",
        "next.config.*",
        "postcss.config.*",
        "tailwind.config.*",
        "eslint.config.*",
        "vite.config.*",
        "public/**",
        "**/types/**",
      ],
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
