/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Arabic & French font subsets from Google Fonts
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
