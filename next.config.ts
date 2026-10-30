import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 = default (thumbnails), 85 = viewer, so small print on notice papers stays crisp
    qualities: [75, 85],
    // notices uploaded from the dashboard
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
