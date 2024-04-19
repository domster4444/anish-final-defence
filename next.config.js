/** @type {import('next').NextConfig} */

const enablePWA = false;

const withPWA = require("next-pwa")({
  dest: "public",
  disable: !enablePWA,
});
const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ["i.ibb.co", "localhost"],
  },
});

module.exports = nextConfig;
