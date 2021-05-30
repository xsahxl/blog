# webpack 优化

## 优化打包速度

优化 webpack 构建速度的第一步是知道将精力集中在哪里。我们可以通过 speed-measure-webpack-plugin 测量你的 webpack 构建期间各个阶段花费的时间：

```js
// 分析打包时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// ...
module.exports = smp.wrap(prodWebpackConfig);
```

- #### 合理的配置 mode 参数

  可设置 development, production 或 none，如果没有设置，webpack4 会将 mode 的默认值设置为 production，production 模式下会进行 tree shaking(去除无用代码)和 uglifyjs(代码压缩)

- #### 缩小文件的搜索范围(配置 include exclude alias noParse extensions)

  alias: 当我们代码中出现 import 'vue'时， webpack 会采用向上递归搜索的方式去 node_modules 目录下找。为了减少搜索范围我们可以直接告诉 webpack 去哪个路径下查找。也就是别名(alias)的配置。
  include exclude 同样配置 include exclude 也可以减少 webpack loader 的搜索转换时间。
  noParse 当我们代码中使用到 import jq from 'jquery'时，webpack 会去解析 jq 这个库是否有依赖其他的包。但是我们对类似 jquery 这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加 noParse 属性,告诉 webpack 不必解析，以此增加打包速度。
  extensions webpack 会根据 extensions 定义的后缀查找文件(频率较高的文件类型优先写在前面)

- #### 使用 HappyPack 开启多进程 Loader 转换

  在 webpack 构建过程中，实际上耗费时间大多数用在 loader 解析转换以及代码的压缩中。日常开发中我们需要使用 Loader 对 js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于 js 单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。HappyPack 的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间

- #### 使用 webpack-parallel-uglify-plugin 优化代码的压缩时间

- #### 配置缓存 cache-loader

  我们每次执行构建都会把所有的文件都重复编译一遍，这样的重复工作是否可以被缓存下来呢，答案是可以的。babel-loader 开启 cache 后做的事情，将 loader 的编译结果写入硬盘缓存。再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存。使用方法如官方 demo 所示，在一些性能开销较大的 loader 之前添加此 loader 即可

  - webpack.config.js

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.ext$/,
          use: ['cache-loader', ...loaders],
          include: path.resolve('src'),
        },
      ],
    },
  };
  ```

## 优化打包文件体积

- #### 引入 webpack-bundle-analyzer 分析打包后的文件

- #### externals

  按照官方文档的解释，如果我们想引用一个库，但是又不想让 webpack 打包，并且又不影响我们在程序中以 CMD、AMD 或者 window/global 全局等方式进行使用，那就可以通过配置 Externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用 Externals 的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN 的方式，去引用它们。
