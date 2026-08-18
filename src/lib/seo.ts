import { type GuidePage, pathForGuide, siteConfig } from '~/data/site';

function normalizePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  if (withSlash === '/') return '';
  return withSlash.replace(/\/+$/, '');
}

export function absoluteUrl(path = '/'): string {
  return `${siteConfig.siteUrl}${normalizePath(path)}`;
}

export function pageTitle(title: string): string {
  return `${title} | ${siteConfig.title}`;
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    inLanguage: 'en',
  };
}

export function videoGameJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: siteConfig.gameName,
    gamePlatform: ['Steam', 'PC'],
    applicationCategory: 'Game',
    genre: 'Action',
    datePublished: siteConfig.releaseDate,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.developer,
    },
    url: siteConfig.steamUrl,
    image: siteConfig.headerImage,
  };
}

export function articleJsonLd(page: GuidePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    image: siteConfig.heroImage,
    datePublished: page.updated,
    dateModified: page.updated,
    author: {
      '@type': 'Organization',
      name: siteConfig.title,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(pathForGuide(page)),
    },
  };
}

export function faqJsonLd(page: GuidePage) {
  if (!page.faqs || page.faqs.length === 0) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage' as const,
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(page: GuidePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: absoluteUrl(pathForGuide(page)),
      },
    ],
  };
}
