#!/usr/bin/env bash

echo "Deploy to AWS..."

git config user.email "dev@adactive.asia"
git config user.name "Dev Adactive"
git add . && git commit -m "Update"

# Push to server
git push -f dokku@54.255.99.48:mac-slot master 