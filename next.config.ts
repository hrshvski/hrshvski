import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/uk", permanent: false },
      // English version is paused until Q3 2027 (see marketing plan).
      { source: "/en", destination: "/uk", permanent: false },
      { source: "/en/:path*", destination: "/uk", permanent: false },
    ];
  },
};

export default nextConfig;
