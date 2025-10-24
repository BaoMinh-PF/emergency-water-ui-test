import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  basePath: isDev ? "" : "/emergency-water-ui-test",
  assetPrefix: isDev ? "" : "/emergency-water-ui-test",
};

export default nextConfig;
