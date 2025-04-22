/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.us-east-005.backblazeb2.com",
        pathname: "/TinyParrot/**",
      },
    ],
  },
};

module.exports = nextConfig;
