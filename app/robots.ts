import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/leaderboard/pull', '/api/leaderboard/sync'],
    },
    sitemap: 'https://mpnwebsite-apitest.vercel.app/sitemap.xml',
  };
}
