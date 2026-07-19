import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.discordapp.net' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'mc-heads.net' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/NeYyChaFfZ',
        permanent: false, // Use false in case you want to change the invite link later
      },
    ];
  },
};

export default nextConfig;
