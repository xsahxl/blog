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

## [docker常用命令](https://docs.docker.com/engine/reference/run/)

### docker version
### docker info
### docker images
```bash
docker images -a
REPOSITORY                                                          TAG       IMAGE ID       CREATED         SIZE
hello-world                                                         latest    feb5d9fea6a5   24 months ago   13.3kB


# Options
-a, --all             Show all images (default hides intermediate images)
-q, --quiet           Only show image IDs
```

### docker search 搜索镜像
```bash
Options:
  -f, --filter filter   Filter output based on conditions provided

docker search mysql
NAME                            DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                           MySQL is a widely used, open-source relation…   14465     [OK]       
mariadb                         MariaDB Server is a high performing open sou…   5520      [OK]       
percona                         Percona Server is a fork of the MySQL relati…   621       [OK]       
phpmyadmin                      phpMyAdmin - A web interface for MySQL and M…   866       [OK]   

docker search mysql --filter=stars=3000
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   14465     [OK]       
mariadb   MariaDB Server is a high performing open sou…   5520      [OK]  

docker search mysql --limit 2 --format "{{.Name}}: {{.Tag}}"

```

### docker pull 下载镜像

```bash
# 下载镜像 docker pull 镜像名[:tag]
docker pull mysql                      
Using default tag: latest # 如果不写tag，默认就是 latest
latest: Pulling from library/mysql
72a69066d2fe: Pull complete  # 分层下载， docker image的核心
93619dbc5b36: Pull complete 
99da31dd6142: Pull complete 
626033c43d70: Pull complete 
37d5d7efb64e: Pull complete 
ac563158d721: Pull complete 
d2ba16033dad: Pull complete 
688ba7d5c01a: Pull complete 
00e060b6d11d: Pull complete 
1c04857f594f: Pull complete 
4d7cfa90e6ea: Pull complete 
e0431212d27d: Pull complete 
Digest: sha256:e9027fe4d91c0153429607251656806cc784e914937271037f7738bd5b8e7709
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest # 真实地址

# 等价
docker pull mysql
docker pull docker.io/library/mysql:latest 

docker pull mysql:5.7                                                    
5.7: Pulling from library/mysql
72a69066d2fe: Already exists # 下载过的镜像，可以共用。
93619dbc5b36: Already exists 
99da31dd6142: Already exists 
626033c43d70: Already exists 
37d5d7efb64e: Already exists 
ac563158d721: Already exists 
d2ba16033dad: Already exists 
0ceb82207cd7: Pull complete 
37f2405cae96: Pull complete 
e2482e017e53: Pull complete 
70deed891d42: Pull complete 
Digest: sha256:f2ad209efe9c67104167fc609cca6973c8422939491c9345270175a300419f94
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7

docker images                                                            
REPOSITORY                                                          TAG       IMAGE ID       CREATED         SIZE
mysql                                                               5.7       c20987f18b13   21 months ago   448MB
mysql                                                               latest    3218b38490ce   21 months ago   516MB
hello-world                                                         latest    feb5d9fea6a5   24 months ago   13.3kB
```

### docker rmi 删除镜像(rmi = reomve image)
```bash
docker rmi c20987f18b13  
Untagged: mysql:5.7
Untagged: mysql@sha256:f2ad209efe9c67104167fc609cca6973c8422939491c9345270175a300419f94
Deleted: sha256:c20987f18b130f9d144c9828df630417e2a9523148930dc3963e9d0dab302a76
Deleted: sha256:6567396b065ee734fb2dbb80c8923324a778426dfd01969f091f1ab2d52c7989
Deleted: sha256:0910f12649d514b471f1583a16f672ab67e3d29d9833a15dc2df50dd5536e40f
Deleted: sha256:6682af2fb40555c448b84711c7302d0f86fc716bbe9c7dc7dbd739ef9d757150
Deleted: sha256:5c062c3ac20f576d24454e74781511a5f96739f289edaadf2de934d06e910b92

docker images          
REPOSITORY                                                          TAG       IMAGE ID       CREATED         SIZE
mysql                                                               latest    3218b38490ce   21 months ago   516MB
hello-world                                                         latest    feb5d9fea6a5   24 months ago   13.3kB

# 删除所有镜像
docker rmi -f $(docker images -aq)
```

## 容器命令

- 我们有了镜像才可以创建容器，下载一个centos镜像来学习
```bash
docker pull centos   
Using default tag: latest
latest: Pulling from library/centos
a1d0c7532777: Pull complete 
Digest: sha256:a27fd8080b517143cbbbab9dfb7c8571c40d67d534bbdee55bd6c473f432b177
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest
```
### 新建容器并启动

```bash
docker run [可选参数] image

# Options
--name string        容器名字，tomcat01, tomcat02， 用来区分容器
-d, --detach         后台方式运行
# -i, --interactive    STDIN open even if not attached
# -t, --tty            Allocate a pseudo-TTY
-it                  使用交互方式运行，进入容器查看内容
-p                   指定容器的端口，-p 8080:8080
  -p ip:主机端口:容器端口
  -p 主机端口:容器端口 (常用)
  -p 主机端口:容器端口
  容器端口
-P                   随机指定端口


# 测试

docker run -it centos /bin/bash
# -it 交互式运行，centos 是镜像，/bin/bash 以什么样的终端进行交互

➜  blog git:(main) ✗ docker images                  
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
centos       latest    5d0da3dc9764   2 years ago   231MB
➜  blog git:(main) ✗ docker run -it centos /bin/bash
[root@cecbd4b02db5 /]# ls # 查看容器内的centos, 基础版本，很多命令还是不完善的
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@3576810f5231 /]# exit # 退出容器
exit
```

 ### 列出所有运行的容器
 ```bash
 # docker ps 命令
      # 列出正在运行的容器
 -a   # 列出正在运行的容器 + 带出历史运行过的容器
 -n=？ # 显示最近创建的容器
 -q   # 只显示容器的id
blog git:(main) ✗ docker ps                      
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

blog git:(main) ✗ docker ps -a                  
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS                       PORTS     NAMES
cecbd4b02db5   centos         "/bin/bash"   9 minutes ago    Exited (0) 5 minutes ago               pedantic_wiles

blog git:(main) ✗ docker ps -a -n=1
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS                      PORTS     NAMES
3576810f5231   centos    "/bin/bash"   12 minutes ago   Exited (0) 10 minutes ago             festive_euclid

blog git:(main) ✗ docker ps -aq    
3576810f5231
 ```

 ### 退出容器
 ```bash
 exit  # 退出容器，并且停止容器
 ```

### 删除容器
```bash
docker rm 容器id # 删除指定的容器, 不能删除正在运行的容器，如果要强制删除，加上-f
docker rm -f $(docker ps -aq) # 删除所有的容器
docker ps -aq | xargs docker rm -f # 删除所有的容器
```
### 启动和停止容器的操作
```bash
docker start 容器id # 启动容器
docker stop 容器id # 停止容器
docker restart 容器id # 重启容器
docker kill 容器id # 杀死容器（强制停止）
```

## 常用其他命令

### 后台启动容器
```bash
➜  blog git:(main) ✗ docker run -d centos           
774cbf60b4da20bc461874333f29b4dbdc7f50809967754540f15a892ea935f9
➜  blog git:(main) ✗ docker ps           
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
➜  blog git:(main) ✗ 

# docker ps 发现 centos 停止了

# 常见的坑，docker容器使用后台运行，就必须有一个前台进程，docker发现没有应用，就会自动停止
```

### 查看日志

```bash
docker logs -tf --tail 10 容器id， 没有日志

# 自己编写一段shell脚本
➜  blog git:(main) ✗ docker run -d centos /bin/sh -c 'while true;do echo hello-world;sleep 1; done;'
03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d
➜  blog git:(main) ✗ docker ps                                                                      
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
03c7f364f583   centos    "/bin/sh -c 'while t…"   9 seconds ago   Up 8 seconds             romantic_kilby
abec0474048f   centos    "/bin/bash"              4 minutes ago   Up 4 minutes             naughty_chatterjee
➜  blog git:(main) ✗ docker logs -tf --tail 10 03c7f364f583            
2023-09-22T00:42:53.521751442Z hello-world
2023-09-22T00:42:54.526783926Z hello-world

# 参数

-t # 显示时间戳
-f # Follow log output(实时显示)
--tail # 显示多少条日志
```

### 查看容器内部的进程信息

```bash
➜  blog git:(main) ✗ docker top 03c7f364f583      
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                899                 851                 0                   00:42               ?                   00:00:00            /bin/sh -c while true;do echo hello-world;sleep 1; done;
root                2352                899                 0                   00:49               ?                   00:00:00            /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1

```

### 查看镜像的元数据

```bash
➜  blog git:(main) ✗ docker inspect 03c7f364f583
[
    {
        "Id": "03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d",
        "Created": "2023-09-22T00:42:14.087569801Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "while true;do echo hello-world;sleep 1; done;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 899,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2023-09-22T00:42:14.310069225Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d/hostname",
        "HostsPath": "/var/lib/docker/containers/03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d/hosts",
        "LogPath": "/var/lib/docker/containers/03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d/03c7f364f5832e6d3f16dd8cb749ecb7a6ed7e0368c5493d8f63456bd7947d9d-json.log",
        "Name": "/romantic_kilby",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                23,
                140
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/7e704f7f73f2733491a1b23616ecaa866b17d332a0ef8943e87173e567d07db3-init/diff:/var/lib/docker/overlay2/f1ff8fdebc10dc71e0fd49285f6ee88729cb6dd34259bf0096566602ba3af544/diff",
                "MergedDir": "/var/lib/docker/overlay2/7e704f7f73f2733491a1b23616ecaa866b17d332a0ef8943e87173e567d07db3/merged",
                "UpperDir": "/var/lib/docker/overlay2/7e704f7f73f2733491a1b23616ecaa866b17d332a0ef8943e87173e567d07db3/diff",
                "WorkDir": "/var/lib/docker/overlay2/7e704f7f73f2733491a1b23616ecaa866b17d332a0ef8943e87173e567d07db3/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "03c7f364f583",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "while true;do echo hello-world;sleep 1; done;"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "fedfaa40f9fd2aff4f40383ee8d1b5d5168116f75c09a9c181b3e5df9bd639d8",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/fedfaa40f9fd",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "ba95ae056013d468da2d438050e6c72bd97cd7b45d650c9ee3fb9d21a797fa64",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "7bbe4a444021818acb5126c25767f4fcab697961011d148e8e4272d4fd470f97",
                    "EndpointID": "ba95ae056013d468da2d438050e6c72bd97cd7b45d650c9ee3fb9d21a797fa64",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

### 进入正在执行的容器
```bash
# 通常容器以 后台方式 运行的，需要进入容器，修改一些配置。

docker exec -it 容器id bashShell
➜  blog git:(main) ✗ docker ps               
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
03c7f364f583   centos    "/bin/sh -c 'while t…"   17 minutes ago   Up 17 minutes             romantic_kilby
➜  blog git:(main) ✗ docker exec -it 03c7f364f583 /bin/bash
[root@03c7f364f583 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@03c7f364f583 /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 00:42 ?        00:00:00 /bin/sh -c while true;do echo hello-world;sleep 1; done;
root      1055     0  0 00:59 pts/0    00:00:00 /bin/bash
root      1094     1  0 01:00 ?        00:00:00 /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
root      1095  1055  0 01:00 pts/0    00:00:00 ps -ef
[root@03c7f364f583 /]# 


## 方式二
# docker attach 容器id
# 正在执行的代码

➜  blog git:(main) ✗ docker attach 685a6efd43ce       
hello-world
hello-world
hello-world
hello-world
hello-world
hello-world

# docker exec # 进入容器后开启一个新的终端，可以在里面操作(常用)
# docker attach # 进入容器正在执行的终端，不在启动新的进程。

```

### 从容器内拷贝文件到主机上

```bash
➜  blog git:(main) ✗ docker ps -a
CONTAINER ID   IMAGE     COMMAND       CREATED         STATUS                      PORTS     NAMES
4e76fed49632   centos    "/bin/bash"   2 minutes ago   Exited (0) 12 seconds ago             sharp_bouman
➜  blog git:(main) ✗ docker cp 4e76fed49632:/home/test.js ./       
Successfully copied 1.54kB to /Users/shihuali/workspace/my/blog/./
```






