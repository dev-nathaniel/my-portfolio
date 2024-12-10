/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output : 'export',
  images: {
    unoptimized: true, // Required if using the Next.js Image component
  },
}

module.exports = nextConfig
