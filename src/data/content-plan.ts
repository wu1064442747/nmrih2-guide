export type ContentBriefStatus = 'ready-to-write' | 'needs-gameplay-capture' | 'needs-source-research';

export interface ContentBrief {
  slug: string;
  title: string;
  targetIntent: string;
  userOutcome: string;
  status: ContentBriefStatus;
  requiredEvidence: string[];
  requiredBlocks: string[];
}

export const contentBriefs: ContentBrief[] = [
  {
    slug: 'beginner-guide',
    title: 'Beginner Guide',
    targetIntent: 'What should a first-time Responder do before and during a first match?',
    userOutcome: 'Choose a low-risk learning path and understand the core failure risks.',
    status: 'ready-to-write',
    requiredEvidence: ['Steam game overview', 'Armageddon 1.0 update notes'],
    requiredBlocks: ['first-session checklist', 'mode decision table', 'infection and permadeath FAQ'],
  },
  {
    slug: 'survival-mode',
    title: 'Survival Mode Guide',
    targetIntent: 'How does Survival Mode work and when should a player choose it?',
    userOutcome: 'Understand the verified wave loop, success state, and early-extraction condition.',
    status: 'ready-to-write',
    requiredEvidence: ['Armageddon 1.0 update notes'],
    requiredBlocks: ['mode loop table', 'first-run checklist', 'related map links'],
  },
  {
    slug: 'objective-mode',
    title: 'Scenario Mode Guide',
    targetIntent: 'What is the official Scenario Mode and what must be verified before publishing routes?',
    userOutcome: 'Know the official terminology and distinguish verified objective context from route claims.',
    status: 'ready-to-write',
    requiredEvidence: ['Steam game overview', 'Armageddon 1.0 update notes'],
    requiredBlocks: ['terminology note', 'objective-route evidence checklist', 'Raven Rock handoff'],
  },
  {
    slug: 'infection-cure',
    title: 'Infection and Cure Guide',
    targetIntent: 'How does infection change the risk of a run?',
    userOutcome: 'Recognize verified infection stakes without inventing cure locations or timings.',
    status: 'ready-to-write',
    requiredEvidence: ['Steam game overview'],
    requiredBlocks: ['risk explanation', 'team communication checklist', 'source-backed FAQ'],
  },
  {
    slug: 'solo-mode',
    title: 'Solo Mode Guide',
    targetIntent: 'What can a player learn in Solo Mode and what does it not simulate?',
    userOutcome: 'Use Solo Mode to practice maps and builds without confusing it with normal progression.',
    status: 'ready-to-write',
    requiredEvidence: ['Armageddon 1.0 update notes'],
    requiredBlocks: ['practice plan', 'risk and progression table', 'handoff to co-op'],
  },
  {
    slug: 'armageddon-1-0-update',
    title: 'Armageddon 1.0 Update Hub',
    targetIntent: 'What changed in Armageddon 1.0 and which guides are affected?',
    userOutcome: 'See a versioned summary and navigate to affected guides.',
    status: 'ready-to-write',
    requiredEvidence: ['Armageddon 1.0 update notes', 'Steam Armageddon launch news'],
    requiredBlocks: ['feature change table', 'affected guide links', 'last-verified badge'],
  },
  {
    slug: 'rescue-beacon-and-merits',
    title: 'Rescue Beacon and Merits',
    targetIntent: 'What are Rescue Beacons and Merits in Armageddon 1.0?',
    userOutcome: 'Understand the official purpose, trade-offs, and assignment connection.',
    status: 'ready-to-write',
    requiredEvidence: ['Armageddon 1.0 update notes'],
    requiredBlocks: ['item and currency table', 'assignment relationship', 'version caveat'],
  },
  {
    slug: 'weekly-assignments-and-achievements',
    title: 'Weekly Assignments and Achievements',
    targetIntent: 'How do weekly assignments and achievements fit into the 1.0 loop?',
    userOutcome: 'Know the official reset cadence and separate tracked facts from unverified optimisation advice.',
    status: 'ready-to-write',
    requiredEvidence: ['Armageddon 1.0 update notes'],
    requiredBlocks: ['weekly cadence table', 'reward summary', 'update watchlist'],
  },
  {
    slug: 'maps/raven-rock',
    title: 'Raven Rock Map Route',
    targetIntent: 'What is the verified Raven Rock setting and how should a route be documented?',
    userOutcome: 'See the official premise and a clear capture standard before route publication.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['Armageddon 1.0 update notes', 'repeatable route capture', 'annotated screenshots'],
    requiredBlocks: ['objective sequence', 'risk points', 'regroup locations', 'extraction evidence'],
  },
  {
    slug: 'maps/flooded',
    title: 'Flooded Map Route',
    targetIntent: 'How should a team navigate Flooded in Survival Mode?',
    userOutcome: 'Use a tested route rather than a generic map description.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['Armageddon 1.0 update notes', 'repeatable Survival runs', 'annotated screenshots'],
    requiredBlocks: ['defence stages', 'movement route', 'supply visibility notes', 'failure clips'],
  },
  {
    slug: 'maps/lighthouse',
    title: 'Lighthouse Map Route',
    targetIntent: 'How should a team handle Lighthouse positioning and regrouping?',
    userOutcome: 'Use verified spatial guidance, not a guessed route.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['Armageddon 1.0 update notes', 'repeatable Survival runs', 'annotated screenshots'],
    requiredBlocks: ['vertical route map', 'hold positions', 'regroup plan', 'failure clips'],
  },
  {
    slug: 'maps/night-of-the-living-dead',
    title: 'Night of the Living Dead Map Route',
    targetIntent: 'What changed in the 1.0 version of Night of the Living Dead?',
    userOutcome: 'Distinguish current-build facts from older assumptions.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['Armageddon 1.0 update notes', 'current-build comparison capture', 'annotated screenshots'],
    requiredBlocks: ['current layout notes', 'holdout plan', 'change log', 'failure clips'],
  },
  {
    slug: 'weapons',
    title: 'Weapons Database',
    targetIntent: 'Which weapon fits a player role in the current version?',
    userOutcome: 'Compare verified weapon data instead of reading an invented tier list.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['current-build weapon records', 'repeatable tests', 'version-tagged screenshots'],
    requiredBlocks: ['weapon table', 'role filters', 'version notes', 'test method'],
  },
  {
    slug: 'skills',
    title: 'Skills and Builds Database',
    targetIntent: 'What do skills do and which builds fit each mode?',
    userOutcome: 'Compare confirmed effects, unlocks, and trade-offs by version.',
    status: 'needs-gameplay-capture',
    requiredEvidence: ['current-build skill records', 'unlock evidence', 'repeatable tests'],
    requiredBlocks: ['skill table', 'mode filters', 'build comparisons', 'version notes'],
  },
  {
    slug: 'performance-and-known-issues',
    title: 'Performance and Known Issues',
    targetIntent: 'Where can a player find current official issue status and safe troubleshooting steps?',
    userOutcome: 'Separate official status from anecdotal fixes and know when the page needs a refresh.',
    status: 'needs-source-research',
    requiredEvidence: ['current official known-issues post', 'official patch notes', 'platform support guidance'],
    requiredBlocks: ['issue status table', 'official workaround links', 'last-checked date', 'update subscription path'],
  },
];
