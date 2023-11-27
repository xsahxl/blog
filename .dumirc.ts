import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: [
    'https://img.alicdn.com/imgextra/i2/O1CN01ZAedQu1xiyboFhMKk_!!6000000006478-55-tps-200-200.svg',
  ],
  outputPath: 'docs-dist',
  styles: [`body { --font-size-body-1: 16px; }`],
  themeConfig: {
    name: 'xsahxl',
    logo: 'https://img.alicdn.com/imgextra/i2/O1CN01ZAedQu1xiyboFhMKk_!!6000000006478-55-tps-200-200.svg',
    nav: [
      {
        title: '组件',
        link: '/components/rc-table#search-default-value',
        activePath: '/components',
      },
      {
        title: '随笔',
        link: '/note/build-a-website',
        activePath: '/note',
      },
      {
        title: '面试题',
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
    showLineNum: true,
  },
});
