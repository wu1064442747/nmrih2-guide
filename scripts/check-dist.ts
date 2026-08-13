import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { analyticsConfig, guidePages, pathForGuide, siteConfig } from '../src/data/site.ts';

const distDir = join(process.cwd(), 'dist');
const requiredPaths = ['index.html', 'robots.txt', 'sitemap-index.xml'];

for (const path of requiredPaths) {
  statSync(join(distDir, path));
}

for (const page of guidePages) {
  const htmlPath = join(distDir, page.slug, 'index.html');
  const html = readFileSync(htmlPath, 'utf8');
  const canonical = `${siteConfig.siteUrl}${pathForGuide(page)}`;
  if (!html.includes(canonical)) {
    throw new Error(`Missing canonical ${canonical} in ${htmlPath}`);
  }
  if (!html.includes(page.title)) {
    throw new Error(`Missing title ${page.title} in ${htmlPath}`);
  }
}

const home = readFileSync(join(distDir, 'index.html'), 'utf8');
if (!home.includes('rel="stylesheet"')) {
  throw new Error('Built homepage is missing the generated stylesheet link.');
}
if (home.toLowerCase().includes('roblox') || home.includes('/codes')) {
  throw new Error('Built homepage still contains Roblox or codes-site content.');
}
if (!home.includes(`data-domain="${analyticsConfig.plausibleDomain}"`)) {
  throw new Error(`Built homepage is missing Plausible data-domain ${analyticsConfig.plausibleDomain}.`);
}
if (!home.includes(`src="${analyticsConfig.plausibleScriptSrc}"`)) {
  throw new Error(`Built homepage is missing Plausible script ${analyticsConfig.plausibleScriptSrc}.`);
}
if (analyticsConfig.googleSiteVerification && !home.includes('name="google-site-verification"')) {
  throw new Error('Built homepage is missing the Google Search Console verification meta tag.');
}
if (analyticsConfig.clarityProjectId && !home.includes(`https://www.clarity.ms/tag/"+i`)) {
  throw new Error('Built homepage is missing the Microsoft Clarity loader.');
}

console.log(`Checked ${guidePages.length} guide pages in dist.`);
