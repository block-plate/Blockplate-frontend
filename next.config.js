const { createProxyMiddleware } = require('http-proxy-middleware');


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
/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

module.exports = removeImports({...nextConfig})
