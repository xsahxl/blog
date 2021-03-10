---
sidemenu: false
---

# 如何搭建自己的博客

## ui 选型

- [hexo](https://hexo.io/zh-cn/)
- [vuepress](https://vuepress.vuejs.org/zh/)
- [dumi](https://d.umijs.org/zh-CN)

## 部署

- [GitHub Pages](https://pages.github.com/)
- [云服务器](https://ecs.console.aliyun.com/)

## 本次博客搭建 以 dumi 和 GitHub Pages、云服务器为例子进行演示

## dumi

#### 1.环境准备

首先得有 node，并确保 node 版本是 10.13 或以上。

```
node -v
```

#### 2.仓库模板初始化

我们也可以使用 dumi-template 仓库进行初始化，访问 https://github.com/umijs/dumi-template 了解更多。

## [GitHub Pages](https://pages.github.com/)

Head over to GitHub and create a new public repository named username.github.io, where username is your username (or organization name) on GitHub.

#### 部署

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

## [cdn 加速](https://vercel.com)

将项目导入进来，会帮我们部署项目，然后生成一个可访问的 url

## [申请域名](https://www.freenom.com/zh/index.html?lang=zh)（免费一年）

可参考 [教程](https://zhuanlan.zhihu.com/p/115535965)

## [云服务器](https://ecs.console.aliyun.com/)

如果第一次使用阿里云服务器的话，可以先申请[免费试用的云服务器](https://free.aliyun.com/)

### nignx

#### 1.安装

```
yum install nginx
```

#### 2.启动 nginx

```
nginx
```

阿里云服务器的默认开放端口没有 80,记得在安全组里添加下，然后 访问公网 ip 应该会看到 nginx 启动成功了，显然这时候也可以部署我们的静态博客了。

### 云服务器如何上传文件

#### 1.[安装 SecureCRT](https://www.jianshu.com/p/983f2f226579)

#### 2.rz 与 sz 命令

安装

```
yum install lrzsz -y
```

rz 命令（Receive ZMODEM），使用 ZMODEM 协议，将本地文件批量上传到远程 Linux/Unix 服务器，注意不能上传文件夹。
当我们使用虚拟终端软件，如 Xshell、SecureCRT 或 PuTTY 来连接远程服务器后，使用 rz 命令可以上传本地文件到远程服务器。输入 rz 回车后，会出现文件选择对话框，选择需要上传文件，一次可以指定多个文件，上传到服务器的路径为当前执行 rz 命令的目录。

sz 命令（Send ZMODEM）通过 ZMODEM 协议，可将多个文件从远程服务器下载到本地。注意不能下载文件夹，如果下载文件夹，请先打包再下载

### 部署 node 环境

rz 上传 node 包
解压 node 包

```
tar -zxvf node-v14.15.5-linux-x64.tar.xz
```

将文件移动到 /usr/local 目录下

```
mv node-v14.15.5-linux-x64 /usr/local/node
```

检验 node 是否安装成功

```
node -v
```

软连接

```
ln -s /usr/local/node/bin/node /usr/local/bin
ln -s /usr/local/node/bin/npm /usr/local/bin
```

再次执行 node -v 就可以看到版本号了

[express](https://www.expressjs.com.cn/starter/hello-world.html)

pm2 是一个进程管理工具,可以用它来管理你的 node 进程，并查看 node 进程的状态，当然也支持性能监控，进程守护，负载均衡等功能

```
 npm install pm2 -g
```

启动进程/应用

```
 pm2 start helloworld.js
```

列出所有进程/应用

```
 pm2 list
```

删除进程/应用

```
 pm2 delete id
```

### mongodb

[下载资源](https://www.mongodb.com/try/download/community), 注意查看服务器的操作系统，请确保下载正确的版本

解压

```
tar -zxvf mongodb-linux-x86_64-rhel80-4.4.4.tgz
```

将解压后的文件夹移动至指定目录

```
mv mongodb-linux-x86_64-rhel80-4.4.4.tgz /usr/local/mongodb
```

创建数据文件夹、日志文件和 mongo 配置文件

```
mkdir -p  /usr/local/mongodb/data
touch /usr/local/mongodb/mongod.log
touch /usr/local/mongodb/mongodb.conf
```

修改配置文件

```
vim /usr/local/mongodb/mongodb.conf
```

在配置文件中加入如下代码：

```
dbpath=/usr/local/mongodb/data
logpath=/usr/local/mongodb/mongod.log
logappend = true
port = 27017
fork = true
```

进入到安装目录下

```
cd /usr/local/mongodb/bin
```

启动

```
./mongod --config /usr/local/mongodb/mongodb.conf
```

关闭

```
./mongod -shutdown -dbpath=/usr/local/mongodb/data
```

软连接

```
ln -s /usr/local/mongodb/bin/mongo /usr/local/bin
```

查看 mongo 进程 第二列就是进程 id

```
ps -ef|grep mongo
```

结束进程

```
kill id
```

## egg 部署

#### 将本地文件除了 node_modules 进行压缩，并命名为 dist.zip

#### 将文件上传到云服务器

#### 解压文件

```
unzip dist.zip
```

#### 安装依赖

```
npm install --production
```

#### 启动

```
npm start
```

#### 查看当前端口是否占用

```
lsof -i tcp:7001

```

#### 结束进程

```
kill pid
```

#### 这时候访问 公网 ip + 7001 就可以了

#### Nginx 配置

```
location / {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $host;
  proxy_pass   http://127.0.0.1:7001;

  # http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_bind
  # proxy_bind       $remote_addr transparent;
}
```

#### 这时候访问 公网 ip 就可以了
