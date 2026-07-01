#!/bin/sh

set -e

cd /Zoo_Applikation

echo "Fetching latest changes from GitHub"
git pull origin dev

echo "Installing dependencies"
npm install

echo "Starting Backend"
node src/backend/server.js &

echo "Starting application"
exec npm run dev -- --host 0.0.0.0