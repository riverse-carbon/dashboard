/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.airtable.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
    // domains: ['dl.airtable.com', 'lh3.googleusercontent.com']
  },
  publicRuntimeConfig: {
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENT_ID,
    registry_api_url: process.env.REGISTRY_API_URL,
    webapp_url: process.env.WEBAPP_URL,
  },
};

module.exports = nextConfig;
