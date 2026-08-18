import { describe, expect, it } from 'vitest';
import { contentBriefs } from '~/data/content-plan';
import { guidePages } from '~/data/site';

describe('content plan', () => {
  it('keeps a distinct, evidence-aware backlog instead of treating every keyword as publishable', () => {
    expect(contentBriefs).toHaveLength(15);
    expect(new Set(contentBriefs.map((brief) => brief.slug)).size).toBe(contentBriefs.length);
    expect(contentBriefs.some((brief) => brief.status === 'needs-gameplay-capture')).toBe(true);
    expect(contentBriefs.every((brief) => brief.requiredEvidence.length > 0)).toBe(true);
  });

  it('only indexes guide pages that have a publishable content status', () => {
    const indexablePages = guidePages.filter((page) => page.indexable);
    const researchPages = guidePages.filter((page) => !page.indexable);

    expect(indexablePages.length).toBeGreaterThan(0);
    expect(researchPages.length).toBeGreaterThan(0);
    expect(indexablePages.every((page) => page.contentStatus === 'published')).toBe(true);
    expect(researchPages.every((page) => page.contentStatus === 'needs-playtest')).toBe(true);
  });

  it('gives every page evidence, a verified date, and contextual internal links', () => {
    for (const page of guidePages) {
      expect(page.lastVerifiedAt).toMatch(/^2026-08-\d{2}$/);
      expect(page.evidence.length).toBeGreaterThan(0);
      expect(page.relatedSlugs.length).toBeGreaterThan(0);
    }
  });
});
