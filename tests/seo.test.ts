import { describe, expect, it } from 'vitest';
import { guidePages, homePage, siteConfig } from '~/data/site';
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, pageTitle, videoGameJsonLd, websiteJsonLd } from '~/lib/seo';

describe('seo helpers', () => {
  it('builds canonical URLs without trailing slashes', () => {
    expect(absoluteUrl('/beginner-guide')).toBe(`${siteConfig.siteUrl}/beginner-guide`);
    expect(absoluteUrl('/maps/raven-rock/')).toBe(`${siteConfig.siteUrl}/maps/raven-rock`);
  });

  it('uses No More Room in Hell 2 in default page titles', () => {
    expect(pageTitle('Beginner Guide')).toBe('Beginner Guide | No More Room in Hell 2 Guide & Wiki');
  });

  it('emits WebSite and VideoGame JSON-LD for the homepage', () => {
    const website = websiteJsonLd();
    const videoGame = videoGameJsonLd();

    expect(website['@type']).toBe('WebSite');
    expect(website.name).toBe(siteConfig.title);
    expect(videoGame['@type']).toBe('VideoGame');
    expect(videoGame.name).toBe(siteConfig.gameName);
    expect(videoGame.gamePlatform).toContain('Steam');
  });

  it('emits Article and Breadcrumb JSON-LD for each guide page', () => {
    const page = guidePages.find((candidate) => candidate.slug === 'survival-mode');
    expect(page).toBeDefined();
    if (!page) return;

    const article = articleJsonLd(page);
    const breadcrumb = breadcrumbJsonLd(page);

    expect(article['@type']).toBe('Article');
    expect(article.headline).toBe(page.title);
    expect(article.mainEntityOfPage['@id']).toBe(`${siteConfig.siteUrl}/survival-mode`);
    expect(breadcrumb.itemListElement).toHaveLength(2);
  });

  it('keeps homepage metadata focused on the launch topic', () => {
    expect(homePage.title).toContain('Armageddon 1.0');
    expect(homePage.description).toContain('Survival Mode');
  });
});
