# NMRIH2 Guide Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static No More Room in Hell 2 guide site from the approved site spec.

**Architecture:** Astro static output with one data module driving homepage cards, generated guide routes, SEO metadata, and validation checks. Nginx serves the static `dist` output in a Docker image published to GHCR for Dokploy.

**Tech Stack:** Astro 5, TypeScript, Vitest, ESLint, Nginx, GitHub Actions, GHCR.

## Global Constraints

- The site is English-first.
- The site must not use Roblox codes content or navigation.
- Tactical claims that need gameplay confirmation must be marked `needs-playtest`.
- Docker runtime listens on port `80`.
- GHCR publication is not production proof; Dokploy pull/restart/live checks are separate.

---

### Task 1: Site Data and SEO

- [x] Write failing tests for game identity, navigation, P0 slugs, and JSON-LD.
- [x] Implement `src/data/site.ts` and `src/lib/seo.ts`.
- [x] Run `pnpm test`.

### Task 2: Static Pages

- [x] Implement homepage, generated guide pages, legal pages, 404, robots, and global styling.
- [ ] Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm check:dist`.

### Task 3: Deployment Assets

- [x] Add Dockerfile, Nginx config, `.dockerignore`, Dokploy compose, CI, and GHCR publishing workflow.
- [ ] Verify static build output and local preview.
