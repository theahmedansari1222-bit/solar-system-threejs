import type { NextConfig } from "next"

const isGitHubPages = process.env.GITHUB_PAGES === "true"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/solar-system-threejs" : "",
  assetPrefix: isGitHubPages ? "/solar-system-threejs/" : "",
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
