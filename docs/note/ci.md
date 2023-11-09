# ci小记

## 32位还是64位版本的Linux操作系统
输入命令 uname -a 并按下 Enter 键。这会显示关于当前操作系统的详细信息。
在输出结果中查找类似于 "x86_64" 或 "i686" 的字样。
如果看到 "x86_64"，表示您的计算机是64位，应安装64位版本的Linux。
如果看到 "i686"，表示您的计算机是32位，应安装32位版本的Linux。

如果看不到这些信息，您可以尝试进一步使用命令 lscpu 或 arch 来获取更多相关信息。

请注意，大多数现代计算机都支持64位操作系统，因此如果您的计算机是比较新的，建议安装64位版本的Linux以获得更好的性能和兼容性。

## Linux ARM 64bit 和 Linux x86 64bit 如何区别
Linux ARM 64位和Linux x86 64位是两种不同架构的操作系统版本，主要区别在于它们所支持的处理器类型和指令集。以下是它们的区别：

处理器类型：

ARM 64位：适用于基于ARM体系架构的处理器，如ARM Cortex-A系列处理器，常见于移动设备、嵌入式系统和一些低功耗服务器。
x86 64位：适用于基于x86体系架构的处理器，如Intel或AMD的64位处理器，常见于个人计算机、服务器和工作站。
指令集：

ARM 64位：使用ARM体系结构的指令集，如ARMv8-A指令集。
x86 64位：使用x86体系结构的指令集，如x86-64指令集（也称为AMD64或Intel 64）。
在使用Linux操作系统时，需要根据计算机的处理器类型选择相应的版本。如果您不确定自己的计算机是ARM还是x86处理器，可以通过以下方法查看：

打开终端（命令行界面）。
输入命令 uname -m 并按下 Enter 键。这会显示处理器的架构信息。
如果输出结果是 "aarch64"，表示您的计算机是ARM 64位。
如果输出结果是 "x86_64"，表示您的计算机是x86 64位。
根据上述信息，选择正确的Linux版本将确保操作系统与计算机的硬件兼容，并获得最佳性能和稳定性。

## Docker ADD
当使用ADD指令将.tar.gz文件添加到Docker镜像时，Docker会自动解压该文件 (zip文件不会自动解压)
这是因为在Docker中，ADD指令会自动识别并解压.tar和.tar.gz文件。因此，当您使用ADD指令来添加一个.tar.gz文件时，Docker会在构建镜像时自动解压该文件，并将其内容添加到镜像中。

## ossutil安装
```bash
curl https://gosspublic.alicdn.com/ossutil/install.sh | sudo bash
ossutil --endpoint ${{secrets.ENDPOINT}} --access-key-id ${{secrets.AK}} --access-key-secret ${{secrets.SK}} cp file.txt oss://${{secrets.BUCKET_NAME}}/bin/s/
```
安装后会有ossutil 和 ossutil64
```bash
bash-4.2# which ossutil
/usr/bin/ossutil
bash-4.2# which ossutil64
/usr/bin/ossutil64
bash-4.2# ls -la /usr/bin/ossutil64
lrwxrwxrwx 1 root root 16 Oct 30 14:50 /usr/bin/ossutil64 -> /usr/bin/ossutil
bash-4.2# 
```

## throw error
在脚本中抛出一个错误，可以使用 exit 命令结合一个非零的退出状态码来实现。例如，你可以在脚本中使用如下的方式抛出一个错误：
```bash
echo "An error occurred"
exit 1
```

在这个例子中，echo 命令用于输出错误信息，然后 exit 1 命令用于退出脚本，并返回一个非零的状态码（这里是 1），表示发生了错误。

你也可以使用 >&2 将错误信息输出到标准错误流（stderr），这是一个更常见的做法：
```bash
echo "An error occurred" >&2
exit 1
```
这样做可以将错误信息输出到标准错误流，而不是标准输出流。这样，当你在脚本中使用重定向时，可以将错误信息与标准输出分开处理。

当脚本抛出错误时，调用该脚本的程序（如 Git Action）可以检测到非零的退出状态码，并相应地处理错误。

## 条件
在脚本中使用 if...then...else...fi 结构可以根据条件执行不同的操作。下面是一个示例：

```bash
if condition1; then
  # 如果条件1为真，则执行操作1
  echo "Condition 1 is true"
elif condition2; then
  # 如果条件2为真，则执行操作2
  echo "Condition 2 is true"
else
  # 如果所有条件都不为真，则执行操作3
  echo "Conditions 1 and 2 are false"
fi
```

在这个示例中，condition1、condition2 和 condition3 是条件表达式，可以是命令的返回状态、变量的比较、字符串的匹配等。根据条件的结果，执行相应的操作。

你可以根据具体的需求添加更多的 elif 条件分支，每个条件分支都会依次被测试。如果所有的条件都不为真，则执行 else 分支中的操作。

注意，if 语句的每个分支都必须以 then 关键字开始，并以 fi 关键字结束，以标识条件语句的范围。

这是一个简单的示例，你可以根据实际需求在每个分支中执行更复杂的操作。

## 读取package.json文件里的版本号

```bash
VERSION=$(node -p "require('./package.json').version")
echo "Version: $VERSION"

if [[ $VERSION == *"beta"* ]]; then
  echo "This is a prerelease"
else
  echo "Version: $VERSION is not a beta version" >&2
  exit 1
fi

```
在这个脚本中，[[ $VERSION == *"beta"* ]] 用于检查 $VERSION 变量是否包含字符串 "beta"。如果是，则输出 "This is a prerelease"；否则，输出 "Version: $VERSION is not a beta version" 并退出脚本，并返回状态码 1。

注意，使用 [[ 和 ]] 来执行模式匹配和比较，并使用 * 通配符来匹配版本号中的其他字符。

这个脚本假设你已经正确地获取了版本号并将其存储在 $VERSION 变量中。你可以根据自己的需求进行调整和修改。

## 设置默认值

在脚本中，可以使用以下方式为变量设置默认值：
```bash
BRANCH=${branch:-publish}
```
这将将变量 BRANCH 设置为 $branch 的值，如果 $branch 为空或未定义，则将其设置为 "publish"。

使用 ${variable:-default} 语法可以在变量为空或未定义时提供默认值。

在你的脚本中，可以像这样使用它：
```bash
BRANCH=${branch:-publish}
echo "Branch: $BRANCH"
```
如果 $branch 变量有值，则 BRANCH 将设置为 $branch 的值；如果 $branch 变量为空或未定义，则 BRANCH 将设置为 "publish"。然后，脚本输出 Branch: $BRANCH。

这样，你可以在需要设置默认值的情况下使用该语法来简化脚本的编写。