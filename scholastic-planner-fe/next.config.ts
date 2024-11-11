import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseApi: process.env.BASE_API,
  },
};

export default nextConfig;
