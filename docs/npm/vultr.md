# vultr

## 购买机器

- 首先去[vultr 官网](https://my.vultr.com/)注册个账号，买台机器，可选择支付宝充值到余额
- 部署实例，机房可选择日本或者新加坡（网速较快），部署完成后，ping 下 ip 可查看是否成功

## 登陆机器

- 进入终端以 ssh 方式登陆

```
ssh username@ip
```

## 脚本（起个服务）

```
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh
chmod +x shadowsocksR.sh
./shadowsocksR.sh 2>&1 | tee shadowsocksR.log

//执行成功后
Congratulations, ShadowsocksR server install completed!
Your Server IP        :  123.456.789
Your Server Port      :  14627
Your Password         :  123456
Your Protocol         :  origin
Your obfs             :  plain
Your Encryption Method:  aes-256-cfb

//常用命令
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status
配置文件路径：/etc/shadowsocks.json
日志文件路径：/var/log/shadowsocks.log
代码安装目录：/usr/local/shadowsocks
```

## [锐速加速](https://www.vultrcn.com/tag/%E9%94%90%E9%80%9F%E4%B8%80%E9%94%AE/)

## [shadowsocks](https://github.com/shadowsocks/ShadowsocksX-NG)
