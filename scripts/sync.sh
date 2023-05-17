#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# npm run docs:build

# 进入生成的文件夹
cd docs-dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git remote add origin https://${{ secrets.GIT_TOKEN }}@github.com/xsahxl/xsahxl.github.io
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
 git push --set-upstream origin master -f

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:xsahxl/blog.git master:gh-pages

cd -