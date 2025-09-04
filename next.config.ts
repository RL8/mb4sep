import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the correct workspace root to avoid lockfile warnings
  outputFileTracingRoot: __dirname,
  /* config options here */
};

export default nextConfig;
