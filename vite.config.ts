import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
    cors: true,
  },
  esbuild: {
    jsx: "automatic",
  },
  plugins: [viteTsConfigPaths(), tailwindcss(), tanstackStart()],
});
