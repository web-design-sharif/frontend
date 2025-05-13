# Use Node.js 20 (LTS) on Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install serve globally (for serving the static build)
RUN npm install -g serve

# Copy package files first for better layer caching
COPY package*.json ./

RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the React/Vite/Next.js app (adjust if using a different framework)
RUN npm run build

# Expose port 3000 (default for `serve` and many frontend apps)
EXPOSE 3000

# Serve the static build
CMD ["serve", "-s", "build"]