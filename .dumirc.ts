import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: [
    'https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png',
  ],
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'xsahxl',
    logo: 'https://img.alicdn.com/tfs/TB1d_KkfQcx_u4jSZFlXXXnUFXa-200-200.png',
    nav: [
      {
        title: '组件',
        link: '/components/copy',
        activePath: '/components',
      },
      {
        title: '小记',
        link: '/note/build-a-website',
        activePath: '/note',
      },
      {
        title: '知识点',
        link: '/learn/debounce-and-throttle',
        activePath: '/learn',
      },
      {
        title: '踩坑日记',
        link: '/faq/debug',
        activePath: '/faq',
      },
      {
        title: '那些好用的包',
        link: '/npm/ajv',
        activePath: '/npm',
      },
    ] as any,
    socialLinks: {
      github: 'https://github.com/xsahxl',
    },
    footer: `Copyright © ${new Date().getFullYear()} | Powered by xsahxl`,
  },
});
