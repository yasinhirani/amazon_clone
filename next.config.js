/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com", "m.media-amazon.com"],
  },
  env: {
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    mongodb_connect_uri: process.env.MONGODB_CONNECT_URI,
  },
};

module.exports = nextConfig;
