import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: This repo now includes route handlers under `app/api/**/route.ts`,
  // so static export (`output: 'export'`) is no longer compatible.
  turbopack: {
    // Avoid incorrect root inference when multiple lockfiles exist on disk.
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig