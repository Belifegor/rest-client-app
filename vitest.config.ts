import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: { reporter: ["text", "html", "lcov"] },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
