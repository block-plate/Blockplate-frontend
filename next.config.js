const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://api.platechain.shop/api/:slug*',
      },
    ];
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig)
