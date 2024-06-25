/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "objectstorage.me-dubai-1.oraclecloud.com",
        port: "",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/blogs/",
        destination: "https://blogs.purecode.ai/blogs/",
      },
      {
        source: "/blogs/:path*/",
        destination: "https://blogs.purecode.ai/blogs/:path*/",
      },
    ];
  },
};

export default nextConfig;
