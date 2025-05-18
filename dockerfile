FROM node:18.20.5-alpine

# 1. Set working directory
WORKDIR /app

# 2. Copy package.json dan konfigurasi
COPY package*.json .
COPY next.config.js .
COPY tailwind.config.js .
COPY jsconfig.json .

# 3. Install dependencies
RUN npm install && \
    npm install lucide-react next-themes

# 4. Copy seluruh aplikasi
COPY . .

# 5. Build Next.js (dengan path absolut)
RUN npx next build

# 6. Jalankan Next.js
CMD ["npx", "next", "start"]