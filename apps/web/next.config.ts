import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/shiksha-classes/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
