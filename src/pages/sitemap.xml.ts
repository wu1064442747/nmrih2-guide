import { siteConfig } from '~/data/site';

export function GET() {
  const sitemapIndexUrl = `${siteConfig.siteUrl}/sitemap-0.xml`;

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${sitemapIndexUrl}</loc>\n  </sitemap>\n</sitemapindex>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
}
