# lerna发布

## 问题

lerna管理的项目，通过npm publish的话，发布的包不包含lib文件（打包产物）

对于lerna管理的项目，发布某个包的时候，正常请求下，应该通过lerna publish进行发布，但是有时候会卡住，有一次着急发布包的话，就直接在当前包所在的目录执行了 `npm publish`, 发布是成功了，但是发出来的版本不包含lib文件，导致这个版本不可用。

## 解决

在 `package.json` 文件指定 `files` 字段, 更改版本后重新发布即可。

```json
 "files": [
    "lib"
  ],
```
