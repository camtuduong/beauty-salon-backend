# ---- Stage 1: build ----
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Generate Prisma client before building the application
RUN npx prisma generate
RUN npm run build

# ---- Stage 2: production ----
FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma                   
COPY --from=builder /app/prisma7.config.ts ./  

# Expose the port the app runs on - it is the same as defined in main.ts - and not run yet
EXPOSE 5005
CMD ["node", "dist/main.js"]
