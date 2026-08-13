import { describe, expect, it } from 'vitest';
import { analyticsConfig, guidePages, navigationItems, siteConfig } from '~/data/site';

describe('site data', () => {
  it('targets No More Room in Hell 2 as a Steam game guide site', () => {
    expect(siteConfig.gameName).toBe('No More Room in Hell 2');
    expect(siteConfig.platform).toBe('Steam');
    expect(siteConfig.title).toContain('No More Room in Hell 2 Guide');
    expect(siteConfig.siteUrl).toBe('https://no-moreroominhell2.wiki');
  });

  it('uses the production domain for Plausible by default', () => {
    expect(analyticsConfig.plausibleDomain).toBe('no-moreroominhell2.wiki');
    expect(analyticsConfig.plausibleScriptSrc).toBe('https://plausible.ai-baby-dance.com/js/script.js');
  });

  it('does not expose Roblox code-site navigation', () => {
    expect(navigationItems.map((item) => item.href)).not.toContain('/codes');
    expect(JSON.stringify(navigationItems).toLowerCase()).not.toContain('roblox');
  });

  it('ships all first-release guide URLs from the site spec', () => {
    const slugs = guidePages.map((page) => page.slug).sort();
    expect(slugs).toEqual([
      'armageddon-1-0-update',
      'beginner-guide',
      'infection-cure',
      'maps/flooded',
      'maps/lighthouse',
      'maps/night-of-the-living-dead',
      'maps/raven-rock',
      'objective-mode',
      'skills',
      'solo-mode',
      'survival-mode',
      'weapons',
    ]);
  });

  it('keeps unverified tactical guidance visibly marked', () => {
    const uncertainPages = guidePages.filter((page) => page.confidence === 'needs-playtest');
    expect(uncertainPages.length).toBeGreaterThan(0);
    expect(uncertainPages.every((page) => page.sections.some((section) => section.note))).toBe(true);
  });
});
