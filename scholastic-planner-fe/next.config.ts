import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    // Will be available on both server and client
    api: process.env.API_HOST,
  },
  reactStrictMode: true,
};

export default nextConfig;
