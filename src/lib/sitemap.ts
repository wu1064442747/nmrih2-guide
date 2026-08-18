import { guidePages, pathForGuide } from '../data/site';

function normalizePath(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
}

const researchPaths = new Set(
  guidePages.filter((page) => !page.indexable).map((page) => normalizePath(pathForGuide(page))),
);

export function shouldIncludeInSitemap(pageUrl: string): boolean {
  return !researchPaths.has(normalizePath(new URL(pageUrl).pathname));
}
