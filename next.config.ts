import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Google profile images
      },

    ],
   
  },
};

export default nextConfig;
