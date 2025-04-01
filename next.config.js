// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // replace with your actual domain
      },
    ],
  },
};

export default nextConfig;
