#!/bin/bash

# Deployment script for Gandi.net
echo "Starting deployment to Gandi.net..."

# Build the project
echo "Building the project..."
npm run build

# Add git remote if not exists
if ! git remote get-url gandi > /dev/null 2>&1; then
    echo "Adding Gandi git remote..."
    git remote add gandi git+ssh://961ac15e-4525-11f0-9146-00163eada87b@git.sd6.gpaas.net/default.git
fi

# Add all files to git
echo "Preparing files for deployment..."
git add .
git commit -m "Deploy to Gandi.net - $(date)"

# Push to Gandi
echo "Pushing to Gandi.net..."
git push gandi master

echo "Deployment completed!"
echo "Your website should be available at your Gandi domain shortly."