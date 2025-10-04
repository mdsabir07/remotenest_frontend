/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
