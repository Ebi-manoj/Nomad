# ---------- BUILD STAGE ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm ci

# Copy source and config
COPY tsconfig.json ./
COPY eslint.config.mjs ./
COPY src ./src

# Build TypeScript → JavaScript
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Expose application port
EXPOSE 3000

# Start the app
CMD ["node", "dist/interfaces/express/settings/app.js"]
