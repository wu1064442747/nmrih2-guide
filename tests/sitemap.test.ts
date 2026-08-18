import { describe, expect, it } from 'vitest';
import { GET as getRobots } from '~/pages/robots.txt';
import { GET as getSitemap } from '~/pages/sitemap.xml';
import { shouldIncludeInSitemap } from '~/lib/sitemap';
import { siteConfig } from '~/data/site';

describe('sitemap routes', () => {
  it('points robots.txt at sitemap.xml', async () => {
    const response = getRobots();
    expect(response.headers.get('Content-Type')).toContain('text/plain');
    const text = await response.text();
    expect(text).toContain('Sitemap: https://no-moreroominhell2.wiki/sitemap.xml');
  });

  it('serves a sitemap.xml entrypoint for Search Console', async () => {
    const response = getSitemap();
    expect(response.headers.get('Content-Type')).toContain('xml');
    const text = await response.text();
    expect(text).toContain('<sitemapindex');
    expect(text).toContain('https://no-moreroominhell2.wiki/sitemap-0.xml');
  });

  it('excludes research pages from the generated sitemap until they have current-build evidence', () => {
    expect(shouldIncludeInSitemap(`${siteConfig.siteUrl}/survival-mode`)).toBe(true);
    expect(shouldIncludeInSitemap(`${siteConfig.siteUrl}/maps/raven-rock`)).toBe(false);
    expect(shouldIncludeInSitemap(`${siteConfig.siteUrl}/weapons/`)).toBe(false);
  });
});
