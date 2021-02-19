import { defineConfig } from 'dumi';

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
      title: '笔记',
      path: '/notes',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/xsahxl/blog',
    },
  ],
  // base: '/blog',
  // publicPath: '/blog/',
  externals: {
    lodash: '_',
    moment: 'moment',
    'prop-types': 'propTypes',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  scripts: [
    'https://g.alicdn.com/cm-design/mw-vendor/1.2.0/cloud-native-sdk.js',
  ],
  // more config: https://d.umijs.org/config
});
