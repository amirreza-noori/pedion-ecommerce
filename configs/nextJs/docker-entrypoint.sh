#!/bin/sh
set -e

# Default mode is production if NODE_ENV is not set or is empty
if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV not explicitly set. Defaulting to 'production' mode."
  export NODE_ENV="production"
fi

echo "Starting Next.js in $NODE_ENV mode..."

if [ "$NODE_ENV" = "development" ]; then
  echo "Running 'npm run dev' for development mode (with hot-reloading)..."
  # 'exec' replaces the current shell process with 'npm run dev',
  # ensuring that signals (like Ctrl+C) are correctly passed to Next.js.
  exec npm run dev
elif [ "$NODE_ENV" = "production" ]; then
  # WARNING: Running 'npm run build' at container startup is highly discouraged for actual production deployments.
  # This section is included only to meet the explicit requirement of building at runtime for 'production' mode.
  echo "Running 'npm run build' for production mode (this will take time on each container start)..."
  npm run build
  echo "Build complete. Running 'npm start'..."
  exec npm start
else
  # Handle unexpected NODE_ENV values
  echo "Error: Unknown NODE_ENV '$NODE_ENV'. Please set NODE_ENV to 'development' or 'production'."
  exit 1
fi