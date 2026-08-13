export type PageConfidence = 'verified' | 'needs-playtest';

export interface SourceLink {
  label: string;
  href: string;
}

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  note?: string;
}

export interface GuidePage {
  slug: string;
  title: string;
  description: string;
  intent: 'beginner' | 'mode' | 'map' | 'mechanic' | 'equipment' | 'update';
  eyebrow: string;
  updated: string;
  confidence: PageConfidence;
  summary: string;
  highlights: string[];
  sections: GuideSection[];
  sources: SourceLink[];
}

export interface NavigationItem {
  label: string;
  href: string;
}

export const siteConfig = {
  title: 'No More Room in Hell 2 Guide & Wiki',
  shortTitle: 'NMRIH2 Guide',
  gameName: 'No More Room in Hell 2',
  platform: 'Steam',
  developer: 'Torn Banner Studios',
  publisher: 'Torn Banner Studios',
  siteUrl: (process.env.SITE_URL || 'https://no-moreroominhell2.wiki').replace(/\/$/, ''),
  description:
    'Launch-focused No More Room in Hell 2 guide hub covering Armageddon 1.0, Survival Mode, Objective maps, weapons, skills, infection, and beginner routes.',
  officialUrl: 'https://www.nmrih2.com/',
  steamUrl: 'https://store.steampowered.com/app/292000/No_More_Room_in_Hell_2/',
  steamDbUrl: 'https://steamdb.info/app/292000/charts/',
  heroImage:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292000/507527f68a4478b6470a4552ffe393d6a9074161/ss_507527f68a4478b6470a4552ffe393d6a9074161.1920x1080.jpg?t=1786490044',
  headerImage:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292000/775de3f7f26f46a1c6217a7c71656260ee0ca411/header_alt_assets_10.jpg?t=1786490044',
  releaseDate: '2026-08-11',
  earlyAccessDate: '2024-10-22',
} as const;

export const analyticsConfig = {
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  clarityProjectId: process.env.MICROSOFT_CLARITY_PROJECT_ID || process.env.CLARITY_PROJECT_ID || 'y1qesbkovd',
  plausibleDomain: process.env.PLAUSIBLE_DOMAIN || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || new URL(siteConfig.siteUrl).hostname,
  plausibleScriptSrc:
    process.env.PLAUSIBLE_SCRIPT_SRC ||
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ||
    'https://plausible.ai-baby-dance.com/js/script.js',
} as const;

export const sources = {
  steamStore: {
    label: 'Steam store page',
    href: siteConfig.steamUrl,
  },
  steamDb: {
    label: 'SteamDB charts',
    href: siteConfig.steamDbUrl,
  },
  officialSite: {
    label: 'Official NMRIH2 site',
    href: siteConfig.officialUrl,
  },
  armageddonNotes: {
    label: 'Official Armageddon 1.0 update notes',
    href: 'https://www.nmrih2.com/2026/08/10/armageddon-1-0-update-notes/',
  },
  steamNews: {
    label: 'Steam Armageddon launch news',
    href: 'https://store.steampowered.com/news/app/292000/view/693142853115708452',
  },
} satisfies Record<string, SourceLink>;

export const navigationItems: NavigationItem[] = [
  { label: 'Start', href: '/beginner-guide' },
  { label: 'Survival', href: '/survival-mode' },
  { label: 'Maps', href: '/maps/raven-rock' },
  { label: 'Weapons', href: '/weapons' },
  { label: 'Skills', href: '/skills' },
  { label: 'Update', href: '/armageddon-1-0-update' },
];

export const homePage = {
  title: 'No More Room in Hell 2 Guide & Wiki - Armageddon 1.0',
  description:
    'A focused No More Room in Hell 2 guide hub for Armageddon 1.0, Survival Mode, Raven Rock, weapons, skills, infection, solo play, and launch-week routes.',
  eyebrow: 'Armageddon 1.0 launch guide',
  heroTitle: 'Survive the 1.0 launch without guessing.',
  heroBody:
    'Use confirmed Steam and official update sources first, then keep unverified tactics clearly marked until they are playtested.',
} as const;

const sharedSources = [sources.steamStore, sources.officialSite, sources.armageddonNotes, sources.steamNews];

export const guidePages: GuidePage[] = [
  {
    slug: 'beginner-guide',
    title: 'No More Room in Hell 2 Beginner Guide',
    description:
      'Start No More Room in Hell 2 with the right survival priorities: stay together, avoid infection, manage resources, and learn the 1.0 mode split.',
    intent: 'beginner',
    eyebrow: 'Start here',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'This page gives new players the safest first route through No More Room in Hell 2 after the Armageddon 1.0 release.',
    highlights: ['8-player co-op survival', 'Infection matters', 'Objective and Survival modes differ'],
    sections: [
      {
        heading: 'First-match priorities',
        body: [
          'Treat the first match as a survival exercise, not a speedrun. The official store positioning centers cooperation, infection risk, and surviving together, so your first goal is to preserve the team.',
        ],
        bullets: [
          'Move with at least one teammate instead of splitting early.',
          'Spend ammo on threats that block the group, not on every distant target.',
          'Call out health, infection pressure, and useful supplies before moving on.',
        ],
      },
      {
        heading: 'Pick the right mode',
        body: [
          'Use Survival Mode when you want wave pressure and map learning. Use Objective Mode when you want route practice, task execution, and extraction-style pacing.',
        ],
      },
      {
        heading: 'What is still being verified',
        body: [
          'Exact spawn tables, best routes, and optimal weapon picks need repeatable playtesting across the launch build.',
        ],
        note: 'Do not treat early route advice as final until it has been checked in live matches.',
      },
    ],
    sources: [sources.steamStore, sources.armageddonNotes],
  },
  {
    slug: 'survival-mode',
    title: 'No More Room in Hell 2 Survival Mode Guide',
    description:
      'Survival Mode guide for No More Room in Hell 2 Armageddon 1.0, covering what the mode is, who should play it, and how to approach it safely.',
    intent: 'mode',
    eyebrow: 'Mode guide',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'Survival Mode is one of the main Armageddon 1.0 additions and should be a core entry point for launch-week players.',
    highlights: ['Added in Armageddon 1.0', 'Best for replayable map learning', 'Links directly to Flooded, Lighthouse, and Night of the Living Dead'],
    sections: [
      {
        heading: 'What Survival Mode is for',
        body: [
          'Armageddon 1.0 positions Survival Mode as a major new way to play. For a guide site, this page should explain mode expectations before sending readers into individual map pages.',
        ],
      },
      {
        heading: 'How to approach early runs',
        body: [
          'The safe early assumption is that team spacing, ammo conservation, and extraction awareness are more important than aggressive exploration.',
        ],
        bullets: [
          'Learn the safe paths on Flooded before trying split routes.',
          'Use Lighthouse to practice vertical awareness and regrouping.',
          'Treat Night of the Living Dead as a returning map that needs launch-build confirmation.',
        ],
        note: 'Map-specific tactics remain playtest-dependent until verified from repeated 1.0 matches.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'objective-mode',
    title: 'No More Room in Hell 2 Objective Mode Guide',
    description:
      'Objective Mode guide for No More Room in Hell 2, explaining the launch-week role of objective maps, team movement, and route discipline.',
    intent: 'mode',
    eyebrow: 'Mode guide',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary:
      'Objective Mode needs practical routing notes, but first-release content should avoid pretending to know exact optimal routes before playtesting.',
    highlights: ['Team task execution', 'Route learning', 'Raven Rock launch focus'],
    sections: [
      {
        heading: 'Objective play pattern',
        body: [
          'Objective maps reward moving as a coordinated group while completing required tasks. The guide should frame each map around sequence, risk points, and regroup windows.',
        ],
      },
      {
        heading: 'Launch-week risk',
        body: [
          'Raven Rock is the key Objective map to document first because it is called out in Armageddon 1.0 materials.',
        ],
        note: 'Exact objective order and failure points require live-match verification before being written as definitive.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'maps/raven-rock',
    title: 'No More Room in Hell 2 Raven Rock Map Guide',
    description:
      'Raven Rock map guide for No More Room in Hell 2 Armageddon 1.0 with confirmed launch context and playtest-marked route notes.',
    intent: 'map',
    eyebrow: 'Objective map',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary:
      'Raven Rock is the highest-priority Objective map page because Armageddon 1.0 introduces it as a major map topic.',
    highlights: ['Objective map', 'Armageddon 1.0 focus', 'Route details need validation'],
    sections: [
      {
        heading: 'Why this map comes first',
        body: [
          'Raven Rock is named in the Armageddon 1.0 update material, making it a natural first map guide for launch search demand.',
        ],
      },
      {
        heading: 'What to document during playtest',
        body: ['The finished version should capture spawn pressure, objective sequence, resource rooms, extraction timing, and common wipe points.'],
        bullets: ['Objective order', 'Safe regroup spots', 'Resource choke points', 'Extraction timing'],
        note: 'Current page is a launch stub with verified source context, not a final route guide.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'maps/flooded',
    title: 'No More Room in Hell 2 Flooded Map Guide',
    description:
      'Flooded Survival map guide for No More Room in Hell 2 with launch source confirmation and a playtest checklist for routes and resources.',
    intent: 'map',
    eyebrow: 'Survival map',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary: 'Flooded is part of the Survival map cluster that should be documented immediately after the 1.0 release.',
    highlights: ['Survival map', 'Resource routing', 'Needs repeated runs'],
    sections: [
      {
        heading: 'Launch position',
        body: ['Flooded belongs in the first Survival map set because it appears in Armageddon 1.0 materials.'],
      },
      {
        heading: 'Playtest checklist',
        body: ['The useful version of this guide depends on recording team-safe paths and resource visibility.'],
        bullets: ['Identify high-visibility hold areas', 'Track supply density', 'Mark routes that trap slow teammates'],
        note: 'Route advice is intentionally limited until map runs are verified.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'maps/lighthouse',
    title: 'No More Room in Hell 2 Lighthouse Map Guide',
    description:
      'Lighthouse Survival map guide for No More Room in Hell 2 with launch context, route planning notes, and verification status.',
    intent: 'map',
    eyebrow: 'Survival map',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary: 'Lighthouse is a Survival map page that should focus on navigation, visibility, and regrouping once playtested.',
    highlights: ['Survival map', 'Navigation focus', 'Regrouping discipline'],
    sections: [
      {
        heading: 'Launch position',
        body: ['Lighthouse is named in the Armageddon 1.0 update context and belongs in the P0 map set.'],
      },
      {
        heading: 'What the first guide should prove',
        body: ['The final guide needs concrete route screenshots or diagrams, supply notes, and a clear description of where teams commonly separate.'],
        note: 'Do not publish exact best-route claims until checked in-game.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'maps/night-of-the-living-dead',
    title: 'No More Room in Hell 2 Night of the Living Dead Map Guide',
    description:
      'Night of the Living Dead map guide for No More Room in Hell 2, covering its Survival-mode launch relevance and verification plan.',
    intent: 'map',
    eyebrow: 'Survival map',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary:
      'Night of the Living Dead is worth a standalone page because returning-map searches and launch update searches can converge here.',
    highlights: ['Survival map', 'Returning-map interest', 'Needs route confirmation'],
    sections: [
      {
        heading: 'Why it gets a page',
        body: ['The map name appears in official launch context and is specific enough to capture intent better than a generic maps list.'],
      },
      {
        heading: 'Verification plan',
        body: ['Record changes from previous expectations, then separate confirmed 1.0 behavior from older community assumptions.'],
        note: 'Avoid importing old-map advice until it is confirmed against the 1.0 build.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'weapons',
    title: 'No More Room in Hell 2 Weapons Guide',
    description:
      'Weapons guide for No More Room in Hell 2 that explains weapon selection principles without inventing launch-build tier claims.',
    intent: 'equipment',
    eyebrow: 'Equipment',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary:
      'The first weapons page should teach decision-making and reserve final rankings until weapon data and in-game testing are available.',
    highlights: ['Ammo economy', 'Team role fit', 'No fake tier list'],
    sections: [
      {
        heading: 'How to think about weapon choice',
        body: ['Weapon value depends on ammo availability, threat control, team composition, and how risky the current route is.'],
        bullets: ['Prefer reliability over novelty for early runs.', 'Do not drain shared ammo for low-value fights.', 'Keep melee and ranged roles balanced.'],
      },
      {
        heading: 'Why this is not a tier list yet',
        body: ['A tier list needs confirmed weapon stats, encounter pressure, and repeated performance notes.'],
        note: 'Publishing S/A/B rankings before verification would make the page thin and unreliable.',
      },
    ],
    sources: sharedSources,
  },
  {
    slug: 'skills',
    title: 'No More Room in Hell 2 Skills Guide',
    description:
      'Skills guide for No More Room in Hell 2 focused on reading skill value by role, mode, and team needs after the Armageddon 1.0 release.',
    intent: 'equipment',
    eyebrow: 'Builds',
    updated: '2026-08-12',
    confidence: 'needs-playtest',
    summary: 'This page frames skill choices around survival roles until complete verified skill data is available.',
    highlights: ['Role fit', 'Mode context', 'Needs confirmed effects'],
    sections: [
      {
        heading: 'Skill evaluation rules',
        body: ['Judge a skill by how often it prevents a failed run, not only by how strong it sounds in isolation.'],
        bullets: ['Survival skills help when teams are learning maps.', 'Objective utility matters when routes are long.', 'Solo practice rewards consistency.'],
      },
      {
        heading: 'Data needed before rankings',
        body: ['The page needs confirmed skill effects, unlock requirements, and mode-specific usefulness before recommending exact builds.'],
        note: 'Build recommendations remain provisional until source data is complete.',
      },
    ],
    sources: sharedSources,
  },
  {
    slug: 'infection-cure',
    title: 'No More Room in Hell 2 Infection and Cure Guide',
    description:
      'Infection and cure guide for No More Room in Hell 2, explaining why infection risk shapes team survival and launch-week decision-making.',
    intent: 'mechanic',
    eyebrow: 'Mechanic',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'Infection is part of the core Steam positioning and should be explained early because it changes how players value health, supplies, and team movement.',
    highlights: ['Avoid infection', 'Preserve team resources', 'Communicate early'],
    sections: [
      {
        heading: 'Why infection matters',
        body: [
          'The Steam description explicitly calls out avoiding infection, which makes it a central survival concept rather than a minor status effect.',
        ],
      },
      {
        heading: 'Practical early advice',
        body: ['The safest launch-week guidance is to communicate infection pressure early and avoid hiding risk from the team.'],
        bullets: ['Tell teammates when you need medical support.', 'Do not wander off while low on health.', 'Treat cure resources as team-critical supplies.'],
      },
    ],
    sources: [sources.steamStore, sources.officialSite],
  },
  {
    slug: 'solo-mode',
    title: 'No More Room in Hell 2 Solo Mode Guide',
    description:
      'Solo Mode guide for No More Room in Hell 2 Armageddon 1.0, covering when to use solo play and what it can teach before co-op runs.',
    intent: 'mode',
    eyebrow: 'Mode guide',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'Solo Mode is named in Armageddon 1.0 material and deserves a standalone guide because it changes how players practice without a full team.',
    highlights: ['Launch feature', 'Practice route knowledge', 'Lower social friction'],
    sections: [
      {
        heading: 'When Solo Mode helps',
        body: ['Solo Mode is useful for learning controls, testing routes, and understanding map pressure without coordinating a full group.'],
      },
      {
        heading: 'What not to overlearn',
        body: ['Solo practice cannot replace the communication and resource-sharing pressure of an 8-player run.'],
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
  },
  {
    slug: 'armageddon-1-0-update',
    title: 'No More Room in Hell 2 Armageddon 1.0 Update Guide',
    description:
      'Armageddon 1.0 update guide for No More Room in Hell 2 with the launch context, new modes, maps, tutorial, weekly assignments, and Merits.',
    intent: 'update',
    eyebrow: 'Latest update',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'Armageddon 1.0 is the best launch event anchor for the site because it ties together Survival Mode, Raven Rock, Solo Mode, Tutorial, Weekly Assignments, and Merits.',
    highlights: ['1.0 launch anchor', 'Survival Mode', 'Raven Rock', 'Solo Mode'],
    sections: [
      {
        heading: 'What changed',
        body: ['Official update materials call out Armageddon 1.0 as the main current release topic for No More Room in Hell 2.'],
        bullets: ['Survival Mode', 'Raven Rock', 'Solo Mode', 'Tutorial', 'Weekly Assignments', 'Merits'],
      },
      {
        heading: 'How to use this update hub',
        body: ['Use this page as the canonical launch-week summary, then link out to the focused mode and map guides as each one gets more detailed.'],
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews, sources.steamStore],
  },
];

export function getGuidePage(slug: string): GuidePage | undefined {
  return guidePages.find((page) => page.slug === slug.replace(/^\/|\/$/g, ''));
}

export function pathForGuide(page: GuidePage): string {
  return `/${page.slug}`;
}
