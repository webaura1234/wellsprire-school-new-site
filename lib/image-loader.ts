import type { ImageLoaderProps } from 'next/image';
const widths = [320, 640, 960, 1280, 1600];
/** All site photography is pre-encoded; no remote fetch or request-time conversion. */
export default function imageLoader({src,width}:ImageLoaderProps):string {
 if (src.endsWith('.png') || src.endsWith('.svg') || src.endsWith('.jpg') || src.endsWith('.webp') || !src.endsWith('.avif')) {
   return src;
 }
 if(!/^\/images\/[a-z0-9-]+\.avif$/.test(src)) throw new Error(`Image must be added to the local responsive manifest: ${src}`);
 const selected=widths.find(size=>size>=width)??1600;
 return `/images/responsive/${src.slice('/images/'.length,-'.avif'.length)}-${selected}.avif`;
}
