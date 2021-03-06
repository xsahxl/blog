import { defineConfig } from 'dumi';

const base = '/';

export default defineConfig({
  title: 'blog',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',

  mode: 'site',
  navs: [
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '文章',
      path: '/article',
    },
    {
      title: '笔记',
      path: '/notes',
    },
    {
      title: 'GitHub',
      children: [
        {
          title: 'blog',
          path: 'https://github.com/xsahxl/blog',
        },
        {
          title: '@xsahxl/ui',
          path: 'https://github.com/xsahxl/ui',
        },
      ],
    },
  ],
  base,
  publicPath: base,
  // externals: {
  //   lodash: '_',
  //   moment: 'moment',
  //   'prop-types': 'propTypes',
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  // scripts: ['https://shihuali.top/js/sdk.js'],
  styles: ['div.__dumi-default-layout-footer-meta { display: none }'],
  // more config: https://d.umijs.org/config
});
