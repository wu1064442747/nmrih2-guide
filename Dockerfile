# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG SITE_URL=https://no-moreroominhell2.wiki
ARG GOOGLE_SITE_VERIFICATION=
ARG MICROSOFT_CLARITY_PROJECT_ID=
ARG PLAUSIBLE_DOMAIN=
ARG PLAUSIBLE_SCRIPT_SRC=https://plausible.ai-baby-dance.com/js/script.js
ENV SITE_URL=${SITE_URL}
ENV GOOGLE_SITE_VERIFICATION=${GOOGLE_SITE_VERIFICATION}
ENV MICROSOFT_CLARITY_PROJECT_ID=${MICROSOFT_CLARITY_PROJECT_ID}
ENV PLAUSIBLE_DOMAIN=${PLAUSIBLE_DOMAIN}
ENV PLAUSIBLE_SCRIPT_SRC=${PLAUSIBLE_SCRIPT_SRC}

RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health >/dev/null || exit 1
