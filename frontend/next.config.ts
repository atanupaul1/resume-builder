import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repository is not at a custom domain (e.g., username.github.io/resume-builder)
  // uncomment the next line and replace 'resume-builder' with your repo name
  basePath: isProd ? '/resume-builder' : '',
  assetPrefix: isProd ? '/resume-builder/' : '',
};

export default nextConfig;
