---
group:
  title: article
toc: content
---

# git 常用的命令

## github 国内镜像网站 (仅查看，不支持登陆)

[https://kgithub.com/](https://kgithub.com/)
[https://github.com.cnpmjs.org/](https://github.com.cnpmjs.org/)
[https://git.sdut.me/](https://git.sdut.me/)

## 解决 git clone 下载速度缓慢问题， 使用 github 的镜像域名

```bash
git clone https://github.com/xsahxl/blog.git
# 替换成
git clone https://github.com.cnpmjs.org/xsahxl/blog.git
```

## 使用.gitignore 无效的解决方法

```bash
git rm -r --cached .
git add .
```

## 如何切换链接 git 服务器的方式是 ssh 还是 http

```bash
git remote set-url origin <url>
```

## git 提交跳过强检查

```bash
git commit --no-verify -m 'message'
```

## 添加密钥

```bash
ssh-keygen -t rsa -C "xsahxl@126.com"
```

## git commit 撤销

```bash
git reset --soft HEAD^
```

## git 回退到某个 commit

```bash
git reset --hard <commit_id>
```

## 设置全局的用户名与邮箱

```bash
git config --global user.name "xsahxl"
git config --global user.email "xsahxl@126.com"
```

## 当前仓库 设置 用户名和邮箱

优先级由上至下 依次降低

- local 项目级
- global 当前用户级
- system 系统级

```bash
git config --local user.name "xsahxl"
git config --local user.email "xsahxl@126.com"
```

## http 方式 clone 记住密码

```bash
git config credential.helper store
```

## 忽略某文件

```bash
git update-index --assume-unchanged <filename>
```

## 重新添加已忽略的文件

```bash
git add -f <filename>
```

## 切分支

```bash
git checkout <branchName>
```

## 合并分支

```bash
# recommend
git rebase <branchName>

# 会有一条无效的commit
git merge --no-ff <branchName>
# 等效于
git pull origin <branchName>
```

## 删除本地分支（-D 强制删除）

```bash
git branch -d <branchName>
```

## 删除远程分支

```bash
git push origin --delete <branchName>
```

## 代码误删查找 git commit

```bash
git reflog --date=iso
```

## 缓存文件

```bash
git stash
git stash pop
git stash save sth
git stash apply sth
```
