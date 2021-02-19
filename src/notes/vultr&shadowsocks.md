# vultr & shadowsocks

## 买机器

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

mac:[ShadowsocksX-NG.1.9.4.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/384983/1610637483476-5b8ac1b7-2e64-4350-af42-b3302e5852b2.zip?_lake_card=%7B%22uid%22%3A%221610637477242-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F384983%2F1610637483476-5b8ac1b7-2e64-4350-af42-b3302e5852b2.zip%22%2C%22name%22%3A%22ShadowsocksX-NG.1.9.4.zip%22%2C%22size%22%3A13165024%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22Oq2KF%22%2C%22card%22%3A%22file%22%7D)
window:[Shadowsocks.exe.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/384983/1610637604605-47af6660-628c-47c9-b055-6ada299a9974.zip?_lake_card=%7B%22uid%22%3A%221610637604149-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F384983%2F1610637604605-47af6660-628c-47c9-b055-6ada299a9974.zip%22%2C%22name%22%3A%22Shadowsocks.exe.zip%22%2C%22size%22%3A339803%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22PnIEp%22%2C%22card%22%3A%22file%22%7D)
