/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: 'images.unsplash.com' }, { hostname: 'placehold.co' }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
