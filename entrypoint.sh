#!/bin/sh

cd /Zoo_Applikation

echo "Fetching latest changes from GitHub"
git pull origin dev

echo "Installing dependencies"
npm install

echo "Starting application"
exec npm run dev -- --host