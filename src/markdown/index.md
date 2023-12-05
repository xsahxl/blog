# Markdown

## 何时使用
渲染md格式的内容

## 基本使用

```tsx
import { Markdown } from '@xsahxl/ui';

const Demo = () => {
  const str = "<div align=center> <img src=\"https://images.devsapp.cn/devs-github/logo.jpg\" width=\"100%\"/> </div>\n<br>\n<p align=\"center\">\n <a href=\"https://www.npmjs.com/package/@serverless-devs/s\">\n <img src=\"https://img.shields.io/npm/v/@serverless-devs/s\" alt=\"npm version\">\n </a>\n <a href=\"https://www.npmjs.com/package/@serverless-devs/s\">\n <img src=\"https://img.shields.io/npm/dy/@serverless-devs/s\" alt=\"npm download\">\n </a>\n <a href=\"https://bestpractices.coreinfrastructure.org/projects/6486\"><img src=\"https://bestpractices.coreinfrastructure.org/projects/6486/badge\"></a>\n <a href=\"https://nodejs.org/en/\">\n <img src=\"https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen\" alt=\"node.js version\">\n </a>\n <a href=\"https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE\">\n <img src=\"https://img.shields.io/badge/License-Apache2.0-green\" alt=\"license\">\n </a>\n <a href=\"https://github.com/Serverless-Devs/Serverless-Devs/issues\">\n <img src=\"https://img.shields.io/github/issues/serverless-devs/serverless-devs\" alt=\"issues\">\n </a>\n <a href=\"https://github.com/Serverless-Devs/Serverless-Devs/discussions\">\n <img src=\"https://img.shields.io/github/discussions/serverless-devs/serverless-devs\" alt=\"discussions\">\n </a>\n</p>\n\n<p align=\"center\">\n <span><b>Serverless 应用全生命周期管理工具</b></span><br>\n</p>\n\n<p align=\"center\">\n <span><b><a href=\"./readme.md\">中文</a> ｜ <a href=\"./readme_en.md\">English</a></b></span><br>\n</p>\n\n**Serverless Devs** 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能。\n\n<div align=center> <img src=\"https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png\" width=\"100%\"/> </div>\n\n\n> 更多关于 Serverless Devs 的介绍可以参考[项目介绍文档](./docs/zh/readme.md)\n\n# 快速上手\n\n❶ 安装 Node.js(>=12.0.0) 与 NPM 包管理工具； \n\n❷ 安装 Serverless Devs 开发者工具； \n```\n$ npm install @serverless-devs/s -g\n```\n❸ 在命令行中执行命令`s`，并按回车，开启你的 Serverless 之旅； \n\n> 更多详细信息可以参考[Serverless Devs 安装文档](./docs/zh/install.md)和[快速入门指南](./docs/zh/quick_start.md)\n\n# 帮助文档\n\n- [安装文档](./docs/zh/install.md)\n- [命令行操作](./docs/zh/command/readme.md)\n- [Yaml规范](./docs/zh/yaml.md)\n- [配置继承/多环境](./docs/zh/extend.md)\n- [CI/CD平台集成](./docs/zh/cicd.md)\n\n> 如果您想为 Serverless Devs 贡献 Package（包括组件和应用），您可以参考 [Package开发文档](./docs/zh/package_dev.md) \n\n> Serverless Devs 天然支持 Yaml 模式与 Cli 模式，关于两者的区别和试用场景，可以参考文档[ **Yaml 模式 Cli 模式对比**](./docs/zh/yaml_and_cli.md)；关于[**Exit Code 定义**](./docs/zh/tool.md#exit-code-定义)、[**Yaml 文件优先级规范**](./docs/zh/tool.md#yaml-文件优先级规范)、[**密钥使用顺序与规范**](./docs/zh/tool.md#密钥使用顺序与规范)、[**通过环境变量设置密钥**](./docs/zh/tool.md#通过环境变量设置密钥)更多关于项目设计的一些细节可以参考[**开发者工具设计文档**](./docs/zh/tool.md) \n\n# 相关资源\n\n目前 Serverless Devs 项目已经支持的 FaaS 平台/产品：\n\n- Hosted\n - 阿里云函数计算（FC）: [项目仓库](https://github.com/devsapp/fc)\n - AWS Lambda: [项目仓库](https://github.com/devscomp/lambda)\n - 百度智能云函数计算（CFC）: [项目仓库](https://github.com/xinwuyun/cfc)\n - 华为云函数工作流（FG）: [项目仓库](https://github.com/zy-linn/fgs-component)\n - 腾讯云云函数（SCF）: [项目仓库](https://github.com/devscomp/scf)\n- Installable\n - OpenFunction（ofn）: [项目仓库](https://github.com/OpenFunction/serverless-devs)\n - Laf: 开发中...\n \n> 尽管以上 FaaS 平台/产品已经有人贡献或在持续维护中，但是我们仍然非常欢迎大家可以参与贡献/维护，除此之外，其他的 FaaS 平台/产品（例如 Google Cloud Platform Functions、Azure Functions等），我们也非常期望社区的小伙伴们可以参与开发和贡献。\n\n> 🚀 除此之外 Serverless Devs 项目还拥有很多优秀的组件和应用，可以参考[Awesome](./docs/zh/awesome.md)\n\n# 项目期望\n\n- Serverless Devs 希望可以为 Serverless 开发者们提供一款可以无厂商锁定的，可以在 Serverless 应用全生命周期发挥作用的 Serverless 开发者工具；\n- Serverless Registry 希望可以为 Serverless 生态提供一套完整的包管理规范，与 Python 中的 pypi， Nodejs 中的 npm 等类似，将以此来开放和分享 Serverless Package，建设 Serverless 生态；\n- Serverless Developer Meetup 希望可以打造最符合 Serverless 开发者的社区活动，通过这个活动，我们希望更多人可以一起和我们交流、学习 Serverless 相关的产品；\n\n# 项目贡献\n\n我们非常希望您可以和我们一起贡献这个项目。贡献内容包括不限于代码的维护、应用/组件的贡献、文档的完善等，更多详情可以参考[ 🏆 贡献指南](./CONTRIBUTING.md)。\n\n与此同时，我们也非常感谢所有[ 👬 参与贡献的小伙伴](./CONTRIBUTORS.md)，为 Serverless Devs 项目贡献的努力和汗水。\n\n# 规范与许可\n\nServerless Devs 遵循 [Apache-2.0 license](./LICENSE) 开源许可。\n\n位于`node_modules`和外部目录中的所有文件都是本软件使用的外部维护库，具有自己的许可证；我们建议您阅读它们，因为它们的条款可能与[Apache-2.0 license](./LICENSE)的条款不同。\n\n> Serverless Devs adopts CNCF Code of Conduct. This open governance applies to all repos under kubevela org.\n\n# 交流社区\n\n<p align=\"center\">\n<br/><br/>\n<img src=\"https://landscape.cncf.io/images/left-logo.svg\" width=\"150\"/>&nbsp;&nbsp;<img src=\"https://landscape.cncf.io/images/right-logo.svg\" width=\"200\"/>&nbsp;&nbsp;\n<br/><br/>\nServerless Devs 是 CNCF Sandbox 项目，可以在 <a href=\"https://landscape.cncf.io/serverless?license=apache-license-2-0\">CNCF Cloud Native Landscape</a> 中查看。\n</p>\n\n\n您如果有关于错误的反馈或者未来的期待，您可以在 [Issues](https://github.com/serverless-devs/serverless-devs/issues) 和 [Discussions](https://github.com/serverless-devs/serverless-devs/discussions) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 Serverless Devs 的最新动态，您可以通过以下渠道进行：\n\n<p align=\"center\">\n\n| <img src=\"https://img.alicdn.com/imgextra/i2/O1CN01zifTV61Mkg9QRNBUs_!!6000000001473-2-tps-466-462.png\" width=\"200px\" > | <img src=\"https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png\" width=\"200px\" > | <img src=\"https://img.alicdn.com/imgextra/i1/O1CN01ECE9wN1RMvgS6d1JM_!!6000000002098-0-tps-881-877.jpg\" width=\"200px\" > |\n|--- | --- | --- |\n| <center>关注微信公众号：`serverless`</center> | <center>联系微信小助手：`xiaojiangwh`</center> | <center>加入钉钉交流群：`33947367`</center> | \n\n</p>\n\n-----------\n\n> Serverless Devs 开发者工具遵循 [Serverless Devs Model](./spec/readme.md)，更多模型/规范信息可以参考 [Serverless Registry Model](./spec/zh/0.0.2/serverless_registry_model/readme.md)，[Serverless User Model](./spec/zh/0.0.2/serverless_user_model/readme.md) 以及 [Serverless Package Model](./spec/zh/0.0.2/serverless_package_model/readme.md)。\n\n> 隐私说明：为了给开发者提供可优化的使用体验，Serverless Devs会采集部分客户端的错误信息以帮助社区优化工具，当然这些错误信息都是被脱敏后的错误信息，如果您仍然存在疑虑或者不想使用这个功能，您可以通过命令`s set analysis disable`关闭该功能。\n\n\n";

  
  return (
    <>
      <Markdown>
        {str}
      </Markdown>
    </>
  );
};

export default Demo;
```

## js语言高亮

```tsx
import { Markdown } from '@xsahxl/ui';

const Demo = () => {
  const str = "# lodash v4.17.21\n\nThe [Lodash](https://lodash.com/) library exported as [Node.js](https://nodejs.org/) modules.\n\n## Installation\n\nUsing npm:\n```\n$ npm i -g npm\n$ npm i --save lodash\n```\n\nIn Node.js:\n```js\n\n// only test\nimport { get } from 'lodash';\n\n// Load the full build.\nvar _ = require('lodash');\n// Load the core build.\nvar _ = require('lodash/core');\n// Load the FP build for immutable auto-curried iteratee-first data-last methods.\nvar fp = require('lodash/fp');\n\n// Load method categories.\nvar array = require('lodash/array');\nvar object = require('lodash/fp/object');\n\n// Cherry-pick methods for smaller browserify/rollup/webpack bundles.\nvar at = require('lodash/at');\nvar curryN = require('lodash/fp/curryN');\n```\n\nSee the [package source](https://github.com/lodash/lodash/tree/4.17.21-npm) for more details.\n\n**Note:**<br>\nInstall [n_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.\n\n## Support\n\nTested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.<br>\nAutomated [browser](https://saucelabs.com/u/lodash) & [CI](https://travis-ci.org/lodash/lodash/) test runs are available.\n";
   

  return (
    <>
      <Markdown>
        {str}
      </Markdown>
    </>
  );
};

export default Demo;
```

## API

| 属性         | 说明                 | 类型                                                       | 默认值                         |
| ------------ | -------------------- | ---------------------------------------------------------- | ------------------------------ |
| children     | 子节点               | markdown内容 | -                              |
