#!/bin/sh
set -e

# ── Initialize volumes with image data on first run ──

# Database: copy initial database if volume is empty
if [ ! -f /data/db/dev.db ]; then
  echo "📦 Initializing database from build..."
  cp /app/prisma/dev.db /data/db/dev.db
else
  echo "📦 Preserving existing database in volume."
fi

# Images: copy initial static images if volume is empty
if [ ! -f /data/images/.initialized ]; then
  echo "📦 Copying images to persistent volume..."
  cp -rn /app/public/images/* /data/images/ 2>/dev/null || cp -r /app/public/images/* /data/images/ 2>/dev/null || true
  touch /data/images/.initialized
else
  # Sync any newly built static images without overwriting user images
  cp -rn /app/public/images/* /data/images/ 2>/dev/null || true
fi

# Uploads: ensure directory exists
if [ ! -f /data/uploads/.initialized ]; then
  echo "📦 Initializing uploads volume..."
  mkdir -p /data/uploads
  cp -rn /app/public/uploads/* /data/uploads/ 2>/dev/null || true
  touch /data/uploads/.initialized
fi

# Create symlinks safely (idempotent across restarts)
[ -L /app/prisma/dev.db ] && rm -f /app/prisma/dev.db || rm -f /app/prisma/dev.db 2>/dev/null || true
ln -sfn /data/db/dev.db /app/prisma/dev.db

[ -L /app/public/images ] && rm -f /app/public/images || rm -rf /app/public/images 2>/dev/null || true
ln -sfn /data/images /app/public/images

[ -L /app/public/uploads ] && rm -f /app/public/uploads || rm -rf /app/public/uploads 2>/dev/null || true
ln -sfn /data/uploads /app/public/uploads

echo "✅ SAMA Logistics starting on port ${PORT:-3000}..."
exec node server.js
