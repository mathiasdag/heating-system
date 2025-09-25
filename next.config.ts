import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'payload.cms.varmeverket.com',
        port: '',
        pathname: '/api/media/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hem',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
