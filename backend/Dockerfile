FROM node:18-alpine

# Required for Prisma on Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source and build
COPY . .

RUN npm run build

EXPOSE 3000

# Run migrations then start server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]