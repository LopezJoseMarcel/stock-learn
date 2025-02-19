import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    mongo_db_string: process.env.mongo_db_string,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'api.twelvedata.com',
      pathname: '/logo/**', 
    },
    {
      protocol: 'https',
      hostname: 'logo.twelvedata.com',
      pathname: '/symbols/**', 
    }
  ]
  }
};

export default nextConfig;
