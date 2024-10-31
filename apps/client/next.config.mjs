/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
