/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // Add Cloudinary domain here
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
