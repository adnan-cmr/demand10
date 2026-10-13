/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // Allow all domains
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',        // match your badge server port
        pathname: '/uploads/listing-images/**', // optional: limit to badges path
      },
       // Production API (live)
      {
        protocol: 'https',
        hostname: 'api.demand10.com',
        pathname: '/uploads/listing-images/**',
      },
      {
        protocol: 'https',
        hostname: 'api.demand10.com',
        pathname: '/badges/**',
      },
       // Add the Amazon S3 bucket for intent-wire images
      {
        protocol: 'https',
        hostname: 'amzn-s3-intent-wire.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
