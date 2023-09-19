---
group:
  title: note
toc: content
---

# docker学习

## [docs](https://docs.docker.com/)

<!-- - [docker-machine](https://github.com/docker/machine/releases)
```bash
 curl -L https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine && \
  chmod +x /usr/local/bin/docker-machine
``` -->

## [install](https://docs.docker.com/engine/install/)

## docker run hello-world

```bash
docker run hello-world
Unable to find image 'hello-world:latest' locally
docker: request returned Bad Gateway for API route and version http://%2FUsers%2Fshihuali%2F.docker%2Frun%2Fdocker.sock/v1.43/images/create?fromImage=hello-world&tag=latest, check if the server supports the requested API version.
See 'docker run --help'.
```

## 配置[阿里云镜像](https://cr.console.aliyun.com/cn-chengdu/instances/mirrors)

- 点击 Docker Desktop 应用图标 > 设置 > Docker Engine, 将 https://xxxx.mirror.aliyuncs.com 加到"registry-mirrors"的数组里，点击 Apply & Restart按钮，等待Docker重启并应用配置的镜像加速器。
![image](../../public/images/10.png)

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://xxx.mirror.aliyuncs.com"
  ]
}
```


```bash
docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
## docker run 的流程图
![images](../../public//images/11.png)

## docker 为什么比 vm 快
- docker有着比虚拟机更少的抽象层
- docker利用的宿主机的内核，vm需要Guest OS

![images](../../public//images/12.png)

所以说，新建一个容器的时候，docker不需要像虚拟机一样重新加载一个操作系统内核，虚拟机加载Guest OS，分钟级别的，而docker是宿主机的操作系统，
省略了这个复杂的过程，秒级。




