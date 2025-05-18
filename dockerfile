FROM node:18.20.5-alpine

# 1. Set working directory
WORKDIR /app

# 2. Copy package files explicitly (Linux-safe syntax)
COPY ["package.json", "package-lock.json*", "./"]

# 3. Copy config files one by one
COPY next.config.js .
COPY tailwind.config.js .
COPY jsconfig.json .

# 4. Install dependencies
RUN npm install && \
    npm install lucide-react next-themes

# 5. Copy app files (ensure proper ownership)
COPY --chown=node:node . .

# 6. Build Next.js
RUN npx next build

# 7. Run as non-root user
USER node

# 8. Start Next.js
CMD ["npx", "next", "start"]
