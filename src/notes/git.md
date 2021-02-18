# git 命令

## 忽略某文件

```shell
git update-index --assume-unchanged file
```

## 重新添加已忽略的文件

```shell
git add -f file
```

## 切分支

```shell
git checkout pre
```

## 合并分支

```shell
git merge --no-ff dev
```

## 删除本地分支（-D 强制删除）

```shell
git branch -d branchname
```

## 删除远程分支

```shell
git push origin :branchname
```

## 添加密钥

```shell
ssh-keygen -t rsa -C "xsahxl@126.com"
```

## http 方式 clone 记住密码

```shell
git config credential.helper store
```
