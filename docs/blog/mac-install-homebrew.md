---
group:
  title: note
toc: content
---

# mac 环境准备

## 安装 Homebrew

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

## 安装 zsh

```bash
git clone git@github.com:ohmyzsh/ohmyzsh.git ~/.oh-my-zsh --depth 1
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

## autojump

```bash
brew install autojump
Add the following line to your ~/.bash_profile or ~/.zshrc file:
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
```

## zsh-autosuggestions

```bash
git clone https://gitee.com/phpxxo/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```bash
plugins=(git autojump zsh-autosuggestions)

[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
```
