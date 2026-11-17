FROM node:20-alpine
WORKDIR /app

# Install only production dependencies (cached unless package files change)
COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./

ENV PORT=3002
EXPOSE 3002

# Run as the non-root user that ships with the node image
USER node
CMD ["node", "server.js"]
