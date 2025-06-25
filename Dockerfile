# Stage 1: Dependency Installation
# Installs all node_modules (dev and prod) to be copied to the next stage.
FROM node:20-alpine AS deps

# Set working directory inside the container
WORKDIR /app

# Copy package.json and lock files (yarn.lock or package-lock.json)
# Copying these first allows Docker to cache the npm install step.
COPY package.json ./

# Install ALL dependencies (including dev dependencies, as 'npm run build' might need them)
RUN npm install --no-audit

# Stage 2: Runtime Environment (for both Dev and Prod modes)
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy node_modules from the 'deps' stage to the 'runner' stage
# This ensures that dependencies are present without needing to reinstall them.
COPY --from=deps /app/node_modules ./node_modules

# Copy the custom entrypoint script into the container
COPY ./configs/nextJs/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the default Next.js port (3000)
# This informs Docker that the container listens on this port.
EXPOSE 3000

# Set the entrypoint to our custom script.
# This script will be executed every time the container starts.
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# A default CMD can be provided, but our entrypoint handles the main logic,
# so it can be empty or used for passing arguments to the entrypoint.
CMD []