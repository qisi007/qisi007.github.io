#!/usr/bin/env sh

#git add -A
#git commit -m 'update docs'

#git push origin main

# 生成静态文件
echo "开始打包"

sleep 3

pnpm docs:build

echo "打包完成，等待复制站点文件"

sleep 3

cp CNAME docs/.vitepress/dist/

echo "文件复制完成，准备发布"

sleep 3

# 进入生成的文件夹
cd docs/.vuepress/dist/

echo "已切换到发布文件夹，当前位置"

pwd

sleep 3

git init
git add .
git commit -m 'deploy'

echo "开始发布"

sleep 3

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:qisi007/qisi007.github.io.git master:gh-pages
