/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.airtable.com'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      }
    ]
    // domains: ['dl.airtable.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
