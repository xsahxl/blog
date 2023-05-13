---
group:
  title: QA
toc: content
---

# git action 中 npm install 没有安装 开发环境的依赖

我们在跑 git ci 的时候，比如一些前置依赖只在 peerDependencies 和 devDependencies 进行了声明，但是 npm install 并没有安装开发环境的依赖，导致报错提示找不到前置依赖。

## A

GitHub Actions 中的 npm install 命令默认不会安装开发环境的依赖。这是因为，在生产部署过程中，通常不需要安装这些依赖项。如果您需要在 GitHub Actions 中安装开发环境的依赖，您可以使用以下命令：

```bash
npm install --only=dev
```

这将只安装开发环境依赖项。如果您需要安装生产依赖项和开发依赖项，请使用以下命令：

```bash
npm install --production=false
```

> 注意：在 git ci 中用到的前置依赖 都必须要在 peerDependencies 声明，否则发布的时候还是报 找不到这些包。
