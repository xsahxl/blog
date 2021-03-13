---
sidemenu: false
---

## github 国内镜像网站

[https://github.com.cnpmjs.org/](https://github.com.cnpmjs.org/)

[https://git.sdut.me/](https://git.sdut.me/)

## 解决 git clone 下载速度缓慢问题， 使用 github 的镜像域名

```
git clone https://github.com/xsahxl/blog.git
// 替换成
git clone https://github.com.cnpmjs.org/xsahxl/blog.git
```

## 如何切换链接 git 服务器的方式是 ssh 还是 http

```shell
git remote set-url origin <url>
```

## 添加密钥

```shell
ssh-keygen -t rsa -C "xsahxl@126.com"
```

## git commit 撤销

```
git reset --soft HEAD^
```

## git 回退到某个 commit

```
git reset --hard <commit_id>
```

## 设置用户名与邮箱

```
git config --global user.name "xsahxl"
git config --global user.email "xsahxl@126.com"
```

## 当前仓库 设置 用户名和邮箱

优先级由上至下 依次降低

- local 项目级
- global 当前用户级
- system 系统级

```
git config --local user.name "xsahxl"
git config --local user.email "xsahxl@126.com"
```

## http 方式 clone 记住密码

```shell
git config credential.helper store
```

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
