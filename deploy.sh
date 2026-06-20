#!/usr/bin/env bash
set -e

echo "🚀 Deploying points-card-manager..."

git add -A
git commit --allow-empty -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo "✅ Done! 查看部署进度: https://github.com/$(git remote get-url origin | sed 's/.*:\(.*\)\.git/\1/')/actions"
