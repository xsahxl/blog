# git 命令

## 忽略某文件

```shell
git update-index --assume-unchanged <filename>
```

## 重新添加已忽略的文件

```shell
git add -f <filename>
```

## 切分支

```shell
git checkout <branchName>
```

## 合并分支

```shell
git merge --no-ff <branchName>
```

## 删除本地分支（-D 强制删除）

```shell
git branch -d <branchName>
```

## 删除远程分支

```shell
git push origin --delete <branchName>
```

## 添加密钥

```shell
ssh-keygen -t rsa -C "xsahxl@126.com"
```

## http 方式 clone 记住密码

```shell
git config credential.helper store
```
