# Install deps
FROM node:24-alpine AS deps
WORKDIR /app
COPY Frontend/next/package.json Frontend/next/package-lock.json ./
RUN npm ci

# Build Next.js (needs output: "standalone" in next.config)
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY Frontend/next/ ./
RUN npm run build

# Run
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
