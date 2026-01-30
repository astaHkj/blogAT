FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built files
COPY dist ./dist

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "dist/index.js"]
