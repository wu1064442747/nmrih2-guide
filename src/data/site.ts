export type PageConfidence = 'verified' | 'needs-playtest';
export type GuideContentStatus = 'published' | 'needs-playtest';

export interface SourceLink {
  label: string;
  href: string;
}

export interface EvidenceRecord extends SourceLink {
  sourceType: 'official' | 'platform';
  gameVersion: string;
  lastVerifiedAt: string;
}

export interface GuideStep {
  title: string;
  body: string;
}

export interface GuideTable {
  columns: string[];
  rows: string[][];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  note?: string;
  steps?: GuideStep[];
  table?: GuideTable;
}

export interface GuidePage {
  slug: string;
  title: string;
  description: string;
  intent: 'beginner' | 'mode' | 'map' | 'mechanic' | 'equipment' | 'update';
  eyebrow: string;
  updated: string;
  confidence: PageConfidence;
  contentStatus: GuideContentStatus;
  indexable: boolean;
  gameVersion: string;
  lastVerifiedAt: string;
  summary: string;
  highlights: string[];
  sections: GuideSection[];
  sources: SourceLink[];
  evidence: EvidenceRecord[];
  relatedSlugs: string[];
  faqs?: GuideFaq[];
}

type GuidePageDraft = Omit<
  GuidePage,
  'contentStatus' | 'indexable' | 'gameVersion' | 'lastVerifiedAt' | 'evidence' | 'relatedSlugs'
> &
  Partial<Pick<GuidePage, 'contentStatus' | 'indexable' | 'gameVersion' | 'lastVerifiedAt' | 'evidence' | 'relatedSlugs'>>;

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
    'Versioned No More Room in Hell 2 guide hub for Armageddon 1.0, first-match decisions, Survival Mode, Scenario Mode, infection, and Solo Mode.',
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
  { label: 'Scenario', href: '/objective-mode' },
  { label: 'Solo', href: '/solo-mode' },
  { label: 'Infection', href: '/infection-cure' },
  { label: 'Update', href: '/armageddon-1-0-update' },
];

export const homePage = {
  title: 'No More Room in Hell 2 Guide & Wiki - Armageddon 1.0',
  description:
    'A versioned No More Room in Hell 2 guide hub for Armageddon 1.0, first-match decisions, Survival Mode, Scenario Mode, infection, and Solo Mode.',
  eyebrow: 'Armageddon 1.0 launch guide',
  heroTitle: 'Survive the 1.0 launch without guessing.',
  heroBody:
    'Start with versioned official facts, then publish map, weapon, and build guidance only after it has current-build evidence.',
} as const;

const sharedSources = [sources.steamStore, sources.officialSite, sources.armageddonNotes, sources.steamNews];

const defaultGameVersion = 'Armageddon 1.0';
const defaultLastVerifiedAt = '2026-08-17';

function sourceEvidence(source: SourceLink, gameVersion: string, lastVerifiedAt: string): EvidenceRecord {
  return {
    ...source,
    sourceType: source.href.includes('store.steampowered.com') ? 'platform' : 'official',
    gameVersion,
    lastVerifiedAt,
  };
}

function fallbackRelatedSlugs(slug: string): string[] {
  return ['beginner-guide', 'armageddon-1-0-update'].filter((candidate) => candidate !== slug);
}

function createGuidePage(draft: GuidePageDraft): GuidePage {
  if (draft.sources.length === 0) {
    throw new Error(`Guide page ${draft.slug} must include at least one source.`);
  }

  const gameVersion = draft.gameVersion ?? defaultGameVersion;
  const lastVerifiedAt = draft.lastVerifiedAt ?? defaultLastVerifiedAt;
  const contentStatus = draft.contentStatus ?? (draft.confidence === 'verified' ? 'published' : 'needs-playtest');

  return {
    ...draft,
    updated: draft.updated === '2026-08-12' ? defaultLastVerifiedAt : draft.updated,
    contentStatus,
    indexable: draft.indexable ?? contentStatus === 'published',
    gameVersion,
    lastVerifiedAt,
    evidence: draft.evidence ?? draft.sources.map((source) => sourceEvidence(source, gameVersion, lastVerifiedAt)),
    relatedSlugs: draft.relatedSlugs ?? fallbackRelatedSlugs(draft.slug),
  };
}

const guidePageDrafts: GuidePageDraft[] = [
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
    highlights: ['8-player co-op survival', 'Infection matters', 'Scenario and Survival modes differ'],
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
        steps: [
          {
            title: 'Complete the Tutorial first',
            body: 'Armageddon 1.0 adds a guided Tutorial covering melee, ranged combat, objective trials, and inventory management.',
          },
          {
            title: 'Use Solo Mode for low-risk practice',
            body: 'The official update describes Solo Mode as a place to learn maps, objectives, combat, and builds without traditional progression or permadeath risk.',
          },
          {
            title: 'Take the learning plan into co-op',
            body: 'Use a co-op match to practise communication and shared-resource decisions that Solo Mode cannot reproduce.',
          },
        ],
      },
      {
        heading: 'Pick the right mode',
        body: [
          'Steam presents Survival Mode and Scenario Mode as the two core modes. Choose Survival when you want the verified speaker-and-wave loop; use Scenario Mode when you want structured objectives and are ready to learn a current-build route.',
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
    relatedSlugs: ['survival-mode', 'objective-mode', 'solo-mode', 'infection-cure'],
    faqs: [
      {
        question: 'Should a new player start with a route guide?',
        answer: 'Not until that route has current-build screenshots and repeatable verification. Start with the Tutorial, Solo Mode, and the mode overview pages instead.',
      },
      {
        question: 'Does this page list cure locations or weapon rankings?',
        answer: 'No. Those claims remain outside the publishable scope until the current build has evidence.',
      },
    ],
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
          'Armageddon 1.0 positions Survival Mode as a combat-focused experience where speakers draw zombie waves away from population centres. The update confirms a preparation period, defensive waves, supply drops, and an extraction outcome.',
        ],
        table: {
          columns: ['Stage', 'Verified Armageddon 1.0 loop'],
          rows: [
            ['Preparation', 'Responders have a few minutes to loot and prepare defences around the first speakers.'],
            ['Wave defence', 'Hold out for five minutes while protecting the speakers.'],
            ['Progression', 'A successful wave brings another supply drop before the team moves to the next objective.'],
            ['Outcome', 'Three completed waves call a helicopter extraction; after two failed waves, early extraction becomes available.'],
          ],
        },
      },
      {
        heading: 'How to approach early runs',
        body: [
          'The safe early assumption is that team spacing, ammo conservation, and extraction awareness are more important than aggressive exploration.',
        ],
        bullets: [
          'Use the preparation window to agree on roles and a retreat call before the wave begins.',
          'Treat each supply drop as a regroup point, not as a reason to split without a plan.',
          'Use early extraction when the verified failure condition opens rather than treating it as an automatic loss.',
        ],
        note: 'Flooded, Lighthouse, and Night of the Living Dead route advice remains non-indexable until repeated current-build runs are recorded.',
        steps: [
          {
            title: 'Prepare before the first wave',
            body: 'Use the initial loot window to decide how the team will defend and when it will fall back.',
          },
          {
            title: 'Protect the active speakers',
            body: 'The confirmed objective is to keep the speakers broadcasting through the five-minute wave.',
          },
          {
            title: 'Reassess after each wave',
            body: 'Use the additional supply drop and breathing room to decide whether the team can continue safely.',
          },
        ],
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
    relatedSlugs: ['beginner-guide', 'solo-mode', 'maps/flooded', 'maps/lighthouse'],
    faqs: [
      {
        question: 'How many waves are required for the normal extraction outcome?',
        answer: 'The Armageddon 1.0 update states that three successful waves bring a helicopter extraction.',
      },
      {
        question: 'Are the map routes on this site ready to follow?',
        answer: 'No. The map-specific pages stay in research status until repeatable 1.0 route evidence is captured.',
      },
    ],
  },
  {
    slug: 'objective-mode',
    title: 'No More Room in Hell 2 Scenario Mode Guide',
    description:
      'Scenario Mode guide for No More Room in Hell 2, explaining the official terminology, objective context, and route evidence required before publishing tactics.',
    intent: 'mode',
    eyebrow: 'Mode guide',
    updated: '2026-08-12',
    confidence: 'verified',
    summary:
      'Steam uses Scenario Mode for one of the two core modes. This page explains the verified objective context while holding tactical route claims until a current-build capture exists.',
    highlights: ['Official Scenario Mode terminology', 'Difficulty-scaled objective sequences', 'Raven Rock launch focus'],
    sections: [
      {
        heading: 'Use the official mode name',
        body: [
          'The current Steam page describes Scenario Mode and Survival Mode as the two distinct game modes. This route keeps its older objective-mode URL for continuity, but its content follows the official Scenario Mode terminology.',
        ],
        table: {
          columns: ['What is verified', 'What still needs capture'],
          rows: [
            ['Scripted objective scenarios scale with difficulty.', 'Exact objective order for each map.'],
            ['Raven Rock is a new Objective Map in Armageddon 1.0.', 'Current route, regroup points, and failure conditions.'],
            ['Difficulty changes zombie pressure during a sequence.', 'Recommended team composition or build choices.'],
          ],
        },
      },
      {
        heading: 'What a publishable Scenario route must contain',
        body: [
          'A useful route guide needs more than an objective name. It must show the sequence, risk points, regroup windows, and a current-build capture that lets a reader reproduce the advice.',
        ],
        steps: [
          {
            title: 'Record the objective sequence',
            body: 'Capture each required step in one current-build run before documenting an order.',
          },
          {
            title: 'Mark pressure and regroup points',
            body: 'Use screenshots or a diagram to show where difficulty-scaled pressure changes the team decision.',
          },
          {
            title: 'Separate proof from recommendation',
            body: 'Publish verified map facts first; label any team strategy as a repeatable test result with its version.',
          },
        ],
        note: 'Exact Raven Rock objective order and failure points remain subject to live-match verification.',
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
    relatedSlugs: ['beginner-guide', 'survival-mode', 'maps/raven-rock', 'solo-mode'],
    faqs: [
      {
        question: 'Is Objective Mode the official current name?',
        answer: 'The Steam page uses Scenario Mode. This site retains the existing objective-mode URL while using the current official label in the page title and content.',
      },
      {
        question: 'Where is the Raven Rock walkthrough?',
        answer: 'Raven Rock remains a research page until a current-build route has screenshots and repeatable objective evidence.',
      },
    ],
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
        heading: 'Verified Raven Rock context',
        body: [
          'Armageddon 1.0 places Raven Rock outside an underground military bunker in mountainous southern Pennsylvania. Responders investigate the fate of emergency operations personnel in a new Objective Map experience.',
        ],
        table: {
          columns: ['Verified from the update', 'Not published as route advice yet'],
          rows: [
            ['New Objective Map: Raven Rock', 'Objective sequence'],
            ['Underground military bunker setting', 'Resource-room locations'],
            ['Investigation of emergency operations personnel', 'Regroup and extraction timing'],
          ],
        },
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
        heading: 'Verified Flooded context',
        body: ['Flooded is set in a storm-hit industrial complex in rural Pennsylvania. The official update calls out multi-floor buildings, cargo containers, abandoned machinery, widespread groundwater, and limited dry places to share loot.'],
        table: {
          columns: ['Verified map condition', 'Evidence still required'],
          rows: [
            ['Multi-floor industrial spaces and containers', 'Safe movement route between wave areas'],
            ['Groundwater makes defeated zombies harder to confirm', 'Defence locations and regroup markers'],
            ['Dry loot-sharing spots are rare', 'Supply density and timing records'],
          ],
        },
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
        heading: 'Verified Lighthouse context',
        body: ['The official update describes Lighthouse as a coastal environment with a cliffside beacon, a small neighbourhood, abandoned construction, and tight lighthouse spaces that can create quick deaths.'],
        table: {
          columns: ['Verified map condition', 'Evidence still required'],
          rows: [
            ['Cliffside lighthouse and tight interior spaces', 'Vertical movement and regroup route'],
            ['Small neighbourhood and abandoned construction', 'Hold positions and retreat triggers'],
            ['High risk of quick deaths in confined areas', 'Current-build pressure capture'],
          ],
        },
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
        heading: 'Verified Night of the Living Dead context',
        body: ['Armageddon 1.0 describes Night of the Living Dead as an expanded take on the farmhouse setting, with a guest house and barn added to the classic rural holdout scenario.'],
        table: {
          columns: ['Verified current-build context', 'Evidence still required'],
          rows: [
            ['Farmhouse setting with guest house and barn', 'Current holdout plan'],
            ['Survival map built around relentless waves', 'Route and defence screenshots'],
            ['Updated and expanded for this version', 'Confirmed differences from older assumptions'],
          ],
        },
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
          'The Steam overview explicitly lists infection alongside permanent character loss as a core consequence of a run. It describes a race to find pills or a gene therapy cure before an infected Responder turns against allies.',
        ],
        table: {
          columns: ['Verified risk', 'What this site does not claim yet'],
          rows: [
            ['Infection can threaten a Responder before permanent loss.', 'Exact cure locations or spawn tables.'],
            ['The Steam overview names pills and gene therapy cure.', 'Optimal treatment timing or priority order.'],
            ['Team communication affects shared survival decisions.', 'Map-specific medical routes.'],
          ],
        },
      },
      {
        heading: 'Practical early advice',
        body: ['The safest launch-week guidance is to communicate infection pressure early and avoid hiding risk from the team.'],
        bullets: ['Tell teammates when you need medical support.', 'Do not wander off while low on health.', 'Treat cure resources as team-critical supplies.'],
      },
    ],
    sources: [sources.steamStore, sources.officialSite],
    relatedSlugs: ['beginner-guide', 'solo-mode', 'armageddon-1-0-update'],
    faqs: [
      {
        question: 'Does this page provide a current cure-location list?',
        answer: 'No. Cure locations require current-build verification by map before they can be published as reliable advice.',
      },
      {
        question: 'Why report infection pressure early?',
        answer: 'The official game overview frames infection as a team-threatening survival consequence, so hiding risk makes shared-resource decisions harder.',
      },
    ],
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
        body: ['Armageddon 1.0 introduces Solo Mode as a sandbox for learning maps, practising objectives or combat, and testing builds with a kitted-out Responder.'],
        table: {
          columns: ['Solo Mode provides', 'Solo Mode does not replace'],
          rows: [
            ['No traditional progression', 'The reward and risk loop of a normal co-op run'],
            ['Zero risk of permadeath', 'Team communication and shared-resource decisions'],
            ['A low-risk environment for maps and builds', 'Verified co-op route advice'],
          ],
        },
      },
      {
        heading: 'What not to overlearn',
        body: ['Solo practice cannot replace the communication and resource-sharing pressure of an 8-player run.'],
        steps: [
          {
            title: 'Learn controls and inventory flow',
            body: 'Use the Tutorial and a Solo session to make basic combat and inventory actions familiar before joining a group.',
          },
          {
            title: 'Capture route evidence, not assumptions',
            body: 'Use Solo runs to record current-build map details, then validate group-specific tactics separately before publishing them.',
          },
          {
            title: 'Move to co-op for team decisions',
            body: 'Use a group run to practise shared supplies, communication, and extraction choices.',
          },
        ],
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews],
    relatedSlugs: ['beginner-guide', 'survival-mode', 'objective-mode', 'skills'],
    faqs: [
      {
        question: 'Can Solo Mode cause permanent character loss?',
        answer: 'The Armageddon 1.0 update says Solo Mode has zero risk of permadeath.',
      },
      {
        question: 'Does Solo Mode use traditional progression?',
        answer: 'No. The official update says it does not have traditional progression.',
      },
    ],
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
        body: ['Armageddon 1.0 is the current version anchor for this site. The official notes identify new modes, maps, Solo Mode, a Tutorial, Weekly Assignments, Merits, achievements, and balance changes.'],
        table: {
          columns: ['Feature area', 'Verified 1.0 change'],
          rows: [
            ['Modes', 'Survival Mode added; Scenario objectives receive difficulty scaling.'],
            ['Maps', 'Flooded, Lighthouse, Night of the Living Dead, and Raven Rock are highlighted.'],
            ['Practice', 'Solo Mode and a Tutorial are added.'],
            ['Progression', 'Merits, Weekly Assignments, achievements, and the Rescue Beacon are introduced.'],
          ],
        },
      },
      {
        heading: 'How to use this update hub',
        body: ['Use this page as the canonical version summary. It links to publishable mode and beginner pages now, while map, weapon, and skill pages remain research-only until they have current-build evidence.'],
        steps: [
          {
            title: 'Read the version facts',
            body: 'Use the table above to identify which areas changed before relying on old guides or community assumptions.',
          },
          {
            title: 'Open a verified guide',
            body: 'Start with Beginner, Survival, Scenario, Infection, or Solo pages when you need advice that has a clear evidence boundary.',
          },
          {
            title: 'Treat databases as pending until captured',
            body: 'Map routes, weapon rankings, and skill builds need version-tagged testing before they are indexable.',
          },
        ],
      },
    ],
    sources: [sources.armageddonNotes, sources.steamNews, sources.steamStore],
    relatedSlugs: ['beginner-guide', 'survival-mode', 'objective-mode', 'solo-mode', 'infection-cure'],
    faqs: [
      {
        question: 'Which pages are safe to use as current-version overviews?',
        answer: 'The Beginner, Survival, Scenario, Infection, Solo, and this update hub are published around official 1.0 sources. Their source and verification date are visible on-page.',
      },
      {
        question: 'Why are maps, weapons, and skills not treated as finished guides?',
        answer: 'Those pages need current-build route, data, or test evidence. The site keeps them non-indexable until that evidence exists.',
      },
    ],
  },
];

export const guidePages: GuidePage[] = guidePageDrafts.map(createGuidePage);
export const indexableGuidePages = guidePages.filter((page) => page.indexable);

export function getGuidePage(slug: string): GuidePage | undefined {
  return guidePages.find((page) => page.slug === slug.replace(/^\/|\/$/g, ''));
}

export function pathForGuide(page: GuidePage): string {
  return `/${page.slug}`;
}
