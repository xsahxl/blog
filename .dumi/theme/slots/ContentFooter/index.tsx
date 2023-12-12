import { usePrefersColor } from 'dumi';
import React, { type FC } from 'react';
import Giscus from '@giscus/react';


const Footer: FC = () => {
  const _usePrefersColor = usePrefersColor();
  return (
    <section style={{ marginTop: 32 }}>
      <Giscus
        repo="xsahxl/blog"
        repoId="MDEwOlJlcG9zaXRvcnkzNDAwMTg3NzQ="
        category="Announcements"
        categoryId="DIC_kwDOFERGVs4Cbp7S"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata='1'
        inputPosition="top"
        loading="lazy"
        strict="0"
        theme={_usePrefersColor[0] === 'dark' ? 'dark_dimmed' : 'light'}
        lang="zh-CN"
      />
    </section>
  );
};

export default Footer;
