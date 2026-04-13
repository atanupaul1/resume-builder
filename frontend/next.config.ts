import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages needs the repository name as a base path
  basePath: isProd ? '/resume-builder' : '',
  trailingSlash: true,
};

export default nextConfig;
