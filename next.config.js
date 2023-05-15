/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.citgrup.ro'],
    unoptimized: true,
  },
  env: {
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    SERVICE_ID: process.env.SERVICE_ID,
    USER_ID: process.env.USER_ID
  }
}

module.exports = nextConfig
