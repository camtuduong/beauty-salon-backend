# ---- Stage 1: build ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Stage 2: production ----
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Expose the port the app runs on - it is the same as defined in main.ts - and not run yet
EXPOSE 5005
CMD ["node", "dist/main.js"]
