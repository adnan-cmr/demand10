// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/badges/**' },
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/sponsor-badges/**' },
      { protocol: 'https', hostname: 'api.demand10.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'api.demand10.com', pathname: '/badges/**' },
      { protocol: 'https', hostname: 'api.demand10.com', pathname: '/sponsor-badges/**' },
      { protocol: 'https', hostname: 'demand10.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.demand10.com', pathname: '/**' },
      { protocol: 'https', hostname: 'amzn-s3-intent-wire.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'zenprospect-production.s3.amazonaws.com' },
    ],
  },
};

export default nextConfig;