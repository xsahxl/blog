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
