# No More Room in Hell 2 Guide & Wiki

Static launch guide site for `No More Room in Hell 2`.

## Local Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
SITE_URL=https://example.com pnpm build
SITE_URL=https://example.com pnpm check:dist
```

## Content Workflow

The guide data records a game version, a last-verified date, evidence links, related guides, and a publish status. Pages marked `needs-playtest` remain publicly reachable for research, but emit `noindex,follow` and are excluded from the generated sitemap until current-build evidence exists.

The current 15-page content backlog and acceptance criteria are in [`docs/content/2026-08-17-content-backlog.md`](docs/content/2026-08-17-content-backlog.md).

## Analytics and Verification

Production defaults target `https://no-moreroominhell2.wiki`.

Set these GitHub Actions repository variables before publishing the final GHCR image:

```text
SITE_URL=https://no-moreroominhell2.wiki
MICROSOFT_CLARITY_PROJECT_ID=y1qesbkovd
PLAUSIBLE_DOMAIN=no-moreroominhell2.wiki
PLAUSIBLE_SCRIPT_SRC=https://plausible.ai-baby-dance.com/js/script.js
```

Google Search Console is configured as a Domain property. Add this DNS TXT record
at the DNS provider, then click Verify in Search Console:

```text
Name: @
Type: TXT
Value: google-site-verification=bWaj1S7dkV694TmcAbaHAJZlNCinoV9Z98KK3p9pZK0
```

For local verification with placeholders:

```bash
SITE_URL=https://no-moreroominhell2.wiki \
GOOGLE_SITE_VERIFICATION=sample-gsc-token \
MICROSOFT_CLARITY_PROJECT_ID=sampleclarityid \
PLAUSIBLE_DOMAIN=no-moreroominhell2.wiki \
pnpm build
```

## Dokploy

Use the GHCR image published by GitHub Actions:

```text
ghcr.io/wu1064442747/nmrih2-guide:main
```

Configure Dokploy with container port `80` and health check path `/health`.
GHCR publication proves the image exists; production is only verified after Dokploy pulls,
recreates the container, and the live domain serves the latest homepage, sitemap, and canonical URLs.
