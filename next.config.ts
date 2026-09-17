import type { NextConfig } from 'next';
const config:NextConfig={images:{loader:'custom',loaderFile:'./lib/image-loader.ts',deviceSizes:[640,960,1280,1600],imageSizes:[160,320]}};
export default config;
