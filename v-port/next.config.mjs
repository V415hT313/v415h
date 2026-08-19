// GITHUB_ACTIONS is set to "true" automatically by GitHub's CI runners,
// so basePath only kicks in for the deployed build — local dev stays at
// plain http://localhost:3000 with no subpath.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGithubActions && { basePath: "/v415h" }),
};

export default nextConfig;
