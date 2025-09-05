import { defineConfig } from "vitest/config";
import path from "path";


export default defineConfig({
test: {
environment: "jsdom",
setupFiles: ["./vitest.setup.ts"],
css: true,
coverage: { reporter: ["text", "html", "lcov"] }
},
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
});