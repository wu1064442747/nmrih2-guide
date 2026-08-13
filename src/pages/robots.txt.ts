import { guidePages, pathForGuide, siteConfig } from '~/data/site';

export function GET() {
  const sitemapUrl = `${siteConfig.siteUrl}/sitemap-index.xml`;
  const paths = ['/', '/about', '/privacy-policy', '/terms-of-service', ...guidePages.map(pathForGuide)];

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${sitemapUrl}`,
      '',
      '# Launch pages',
      ...paths.map((path) => `# ${path}`),
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
