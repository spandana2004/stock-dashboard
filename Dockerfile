# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY public/ ./public/
COPY src/ ./src/

# Build the React app
RUN npm run build

# Stage 2: Setup the Node.js backend and serve the static frontend
FROM node:18-alpine

WORKDIR /app

# Copy the server's package.json and package-lock.json
COPY server/package.json ./server/
COPY server/package-lock.json ./server/

# Install backend dependencies
RUN cd server && npm install

# Copy the server's source code
COPY server/server.js ./server/

# Copy the built frontend files from the frontend-builder stage
COPY --from=frontend-builder /app/build ./build

# Expose the port your backend server listens on
EXPOSE 5000

# Set the command to run your backend server in production mode
CMD ["node", "server/server.js"]