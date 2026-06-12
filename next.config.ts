import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Screenshots are served straight from the Neon Object Storage public bucket.
    remotePatterns: [
      { protocol: "https", hostname: "**.neon.build" },
    ],
  },
};

export default nextConfig;
