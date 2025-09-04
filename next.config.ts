import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build for now
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during build for now
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
