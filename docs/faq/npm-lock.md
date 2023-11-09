# npm lock 文件锁定的版本不符合预期

项目在迭代的过程中，如果 node_modules 已经安装过了，这个时候 我们 执行

```bash
rm -rf package-lock.json && npm install
```

生成的 package-lock.json 文件内容是有问题的，有些依赖锁定的版本并不是我们预期的。

## A

我们需要删除 node_modules 重新安装生成的 package-lock.json 文件才是正确的。

```bash
rm -rf node_modules package-lock.json && npm install
```
