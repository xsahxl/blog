# npm 发布遇到 400 异常

### 问题描述

当时使用的 pnpm 发布的包，但是一直报错，核心的报错内容如下。一直以为是 pnpm 的问题，经查询发现 npm 存在一些保留字，包名触发到了这个规则 https://github.com/npm/cli/issues/2248

```log
npm ERR! code 400
npm ERR! 400 Bad Request - PUT https://registry.npmjs.org/@xxx%2fdownload - Bad Request
```

### 解决问题

修改包名，例如将 `download` 修改为 `downloads`
