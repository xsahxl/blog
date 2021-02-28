---
sidemenu: false
---

# 如何搭建自己的博客

## 技术选型

- [hexo](https://hexo.io/zh-cn/)
- [vuepress](https://vuepress.vuejs.org/zh/)
- [dumi](https://d.umijs.org/zh-CN)

## 部署

- [GitHub Pages](https://pages.github.com/)
- 云服务器

## 本次博客搭建 以 dumi 和 GitHub Pages、云服务器为例子进行演示

## dumi 准备工作

### 环境准备

首先得有 node，并确保 node 版本是 10.13 或以上。

```
node -v
```

### 仓库模板初始化

我们也可以使用 dumi-template 仓库进行初始化，访问 https://github.com/umijs/dumi-template 了解更多。

## [GitHub Pages](https://pages.github.com/)

Head over to GitHub and create a new public repository named username.github.io, where username is your username (or organization name) on GitHub.

## 部署

1.在 `.umirc.ts` 中设置正确的 `base`。

如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 和 `publicPath` 默认即是 `"/"`。

如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 和 `publicPath` 设置为 `"/<REPO>/"`。

2.在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs-dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:xsahxl/xsahxl.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:xsahxl/blog.git master:gh-pages

cd -
```
