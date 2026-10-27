import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Statischer Export: Varianten erzeugt scripts/optimize-images.mjs vor dem Build.
    loader: 'custom',
    loaderFile: './components/site/image-loader.ts',
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [128, 256, 384],
  },
};

export default nextConfig;
