import { defineConfig } from 'dumi';

export default defineConfig({
  title: `shihuali's blog`,
  favicons: [
    'https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png',
  ],
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'xsahxl',
    logo: 'https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png',
    nav: [
      {
        title: 'Component',
        link: '/components/key-value',
        activePath: '/components',
      },
      {
        title: 'Blog',
        link: '/blog/serverless-devs',
        activePath: '/blog',
      },
    ] as any,
    socialLinks: {
      github: 'https://github.com/xsahxl/blog',
    },
    footer: `Copyright © ${new Date().getFullYear()} | Powered by xsahxl`,
  },
});
