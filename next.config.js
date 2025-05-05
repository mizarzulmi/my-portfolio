/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    windowHistorySupport: true,
    optimizePackageImports: ['lucide-react']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ]
  }
}

module.exports = nextConfig