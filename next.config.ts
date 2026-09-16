import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>, so assets need that prefix.
// Unset locally, keeping the dev server at the root path.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
