/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "wirthitmusic.local",
    port: 3000,
    open: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: true,
  },
});
