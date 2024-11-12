/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  /* config options here */
  publicRuntimeConfig: {
    // Will be available on both server and client
    api: process.env.API_HOST,
  },
  reactStrictMode: true,
};

