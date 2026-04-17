import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' to allow Vercel's native Next.js handling
  images: {
    unoptimized: true,
  },
  // Removed basePath that was causing 404s on Vercel
  trailingSlash: true,
};

export default nextConfig;
