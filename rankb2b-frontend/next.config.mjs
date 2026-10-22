/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'https', hostname: 'api.rankb2b.com', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/badges/**' },
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/sponsor-badges/**' },
    ],
  },
};

export default nextConfig;