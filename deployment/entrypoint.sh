#!/bin/sh

cd /Zoo_Applikation

echo "Fetching latest changes from GitHub"
git pull origin dev

echo "Installing dependencies"
npm install

echo "Starting Backend"
nohup node src/backend/server.js > backend.log 2>&1 &

echo "Starting application"
exec npm run dev -- --host