/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // Add Cloudinary domain here
    },
    eslint:{
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
