import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    mongo_db_string: process.env.mongo_db_string,
  }
};

export default nextConfig;
