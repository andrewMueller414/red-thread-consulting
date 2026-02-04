import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // For monaco to avoid double initialization errors in dev.
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "red-thread-consulting-media.s3.us-east-2.amazonaws.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
        ],
        minimumCacheTTL: 3600,
    },
};

export default nextConfig;
