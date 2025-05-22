import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
  plugins: [react(), tsconfigPaths()],
});
