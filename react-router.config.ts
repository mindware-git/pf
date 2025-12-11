import type { Config } from "@react-router/dev/config";

// GitHub Pages (static) requires SPA mode
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default {
  // Config options...
  // SSR: enabled for dynamic deployments, disabled for GitHub Pages
  ssr: !isGitHubPages,
} satisfies Config;
