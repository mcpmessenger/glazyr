/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for S3/CloudFront hosting.
  // This repo currently has no route handlers (no `app/**/route.ts`), so export is viable.
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig