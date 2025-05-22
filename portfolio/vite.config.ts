import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Portfolio/", // replace with your GitHub repo name!
  plugins: [react(), tsconfigPaths()],
});
