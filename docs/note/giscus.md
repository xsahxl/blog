# 配置 Github Discussions 作为博客的评论系统

## [giscus](https://giscus.app/zh-CN)

选择 giscus 连接到的仓库。请确保：

- 该仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)，否则访客将无法查看 discussion。
- [giscus app](https://github.com/apps/giscus) 已安装，否则访客将无法评论和回应。
- [Discussions 功能已在你的仓库中启用](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)

## 使用

按照 `giscus` 的文档进行配置，可以得到以下代码

```html
<script
  src="https://giscus.app/client.js"
  data-repo="xsahxl/blog"
  data-repo-id="MDEwOlJlcG9zaXRvcnkzNDAwMTg3NzQ="
  data-category="Announcements"
  data-category-id="DIC_kwDOFERGVs4Cbp7S"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="1"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="zh-CN"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script>
```

## dumi 如何引用 giscus

- 首先，我们需要明确的是[更改主题](https://d.umijs.org/theme)可以去添加 评论相关的ui
- 根据自己需要，看看这个 评论相关的ui 放到哪个位置，那么dumi留给哪些slot我们可以自己去自定义呢？
  ![](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/theme-slot.png)
  直接 `cd node_modules/dumi/theme-default/slots`, 可以看到截图中的slot我们都可以进行自定义。

## 安装

> 安装 [`@giscus/react`](https://github.com/giscus/giscus-component) 包，它是一个 React 组件，用于在 React 应用程序中嵌入 Giscus。

```bash
npm i @giscus/react -D
```

- .dumi/theme/slots/ContentFooter/index.tsx

```tsx | pure
import { usePrefersColor } from 'dumi';
import { useLocation } from 'dumi';
import React, { type FC } from 'react';
import Giscus from '@giscus/react';

const Footer: FC = () => {
  const location = useLocation();
  const _usePrefersColor = usePrefersColor();
  // 首页不展示 评论相关ui
  if (location.pathname === '/') return null;
  return (
    <div style={{ marginTop: 32 }} key={location.pathname}>
      <Giscus
        repo="xsahxl/blog"
        repoId="MDEwOlJlcG9zaXRvcnkzNDAwMTg3NzQ="
        category="Announcements"
        categoryId="DIC_kwDOFERGVs4Cbp7S"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        loading="lazy"
        strict="0"
        theme={_usePrefersColor[0] === 'dark' ? 'dark_dimmed' : 'light'}
        lang="zh-CN"
      />
    </div>
  );
};

export default Footer;

```

- 由于这个slot只渲染一次，但是不同的页面我们都想重新去渲染，所以加了key={location.pathname}
- 主题适配: theme={\_usePrefersColor[0] === 'dark' ? 'dark_dimmed' : 'light'}
- 首页不渲染: if (location.pathname === '/') return null;


## demo

至此，配置 Github Discussions 作为博客的评论系统就已经完成了，具体可见 [demo](https://github.com/xsahxl/blog)