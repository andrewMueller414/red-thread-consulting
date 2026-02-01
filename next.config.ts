import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // For monaco to avoid double initialization errors in dev.
    reactStrictMode: false,
    // typedRoutes: "",
};

export default nextConfig;
