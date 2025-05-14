/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Hapus windowHistorySupport jika ada
    // Tambahkan hanya opsi yang didukung
    serverActions: true,
    windowHistorySupport: true,
    optimizePackageImports: ["lucide-react"],
  },
  // Konfigurasi Sanity
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
