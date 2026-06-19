import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base keeps assets working on subpath/static hosting.
  base: "./",
});
