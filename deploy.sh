#!/usr/bin/env sh

#git add -A
#git commit -m 'update docs'

#git push origin main

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:qisi007/qisi007.github.io.git master:gh-pages
