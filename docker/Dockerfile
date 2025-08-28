FROM node:20-alpine AS deps
WORKDIR /app
ENV CI=1 \
    npm_config_fund=false \
    npm_config_audit=false
COPY package*.json ./

RUN npm ci --no-audit

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY package*.json ./
COPY postcss.config.* ./
COPY next.config.* ./
COPY jsconfig*.json tsconfig*.json ./
COPY public ./public
COPY src ./src

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./

RUN npm ci --omit=dev --no-audit
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]