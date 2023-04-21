import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'xsahxl',
    logo: 'https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png',
    nav: [
      {
        title: 'Component',
        link: '/components/query',
        activePath: '/components',
      },
      {
        title: 'Note',
        link: '/notes/git-cmd',
        activePath: '/notes',
      },
    ] as any,
    socialLinks: {
      github: 'https://github.com/xsahxl/blog',
    },
    footer: `Copyright © ${new Date().getFullYear()} | Powered by xsahxl`,
  },
});
