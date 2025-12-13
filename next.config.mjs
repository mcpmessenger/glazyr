/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: This repo now includes route handlers under `app/api/**/route.ts`,
  // so static export (`output: 'export'`) is no longer compatible.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig