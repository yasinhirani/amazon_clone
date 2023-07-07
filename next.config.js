/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com", "m.media-amazon.com"],
  },
  env: {
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
  },
};

module.exports = nextConfig;
