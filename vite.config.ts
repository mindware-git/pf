import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Determine base path based on deployment target
let base = "/";
if (process.env.GITHUB_PAGES === "true") {
  base = "/pf/"; // GitHub Pages static deployment
}
// else: default "/" for dev and dynamic deployments

export default defineConfig({
  base,
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
