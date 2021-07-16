#!/usr/bin/env bash

echo "Deploy to AWS..."

npm run build

# cd build && git init

git config user.email "dev@adactive.asia"
git config user.name "Dev Adactive"
git add . && git commit -m "Update"

# Push to server
git push -f dokku@18.141.29.133:marina master