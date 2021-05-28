# sync-demo

```javascript
const fs = require('fs-extra');
const path = require('path');
// 运行这个脚本之前，把这个参数改成本地fusion仓库的docs目录
const consoleComponents = 'consoleComponents';
const baseComponentsPath = path.join(__dirname, '/base-components');
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            fs.stat(_src, function(err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback);
                }
              }
            });
          });
        }
      });
    }
  }
  fs.access(dist, function(err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });
}

copyDir(consoleComponents, baseComponentsPath);
```

## doc

```javascript
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
// 运行这个脚本之前，把这个参数改成本地fusion仓库的docs目录
const fusionDocs = 'fusionDocs';
const baseComponentsPath = path.join(__dirname, '../base-components');

//js=>jsx
glob('*/demo/*.js', { cwd: baseComponentsPath }, (err, res) => {
  if (err) throw err;
  _.each(res, item => {
    fs.rename(
      path.join(baseComponentsPath, `${item}`),
      path.join(baseComponentsPath, `${item}x`),
    );
  });
});

glob('*/*.md', { cwd: baseComponentsPath }, (err, res) => {
  if (err) throw err;
  _.each(res, item => {
    const content = fs.readFileSync(
      path.join(baseComponentsPath, item),
      'utf8',
    );
    let contentLines = _.split(content, '\n');
    const index = _.findIndex(contentLines, obj => _.includes(obj, '#'));
    contentLines = _.slice(contentLines, index);
    const apiIndex = _.findIndex(contentLines, obj => _.includes(obj, 'API'));
    apiIndex > 0 && contentLines.splice(apiIndex, 5);
    contentLines = _.map(contentLines, lines => {
      if (_.startsWith(lines, '#include')) {
        const start = lines.indexOf('demo');
        const end = lines.indexOf('js');
        return `<code src="./${lines.substring(start, end)}jsx" />`;
      } else {
        return lines;
      }
    });
    const [compName] = _.split(item, '/');
    const fusionContent = fs.readFileSync(
      path.join(fusionDocs, `${compName}/index.md`),
      'utf8',
    );

    const fusionContentLines = _.split(fusionContent, '\n');
    const fusionApiIndex = _.findIndex(fusionContentLines, obj =>
      _.includes(obj, 'API'),
    );
    let generateCode = _.concat(
      ['---\n group:\n  title: 基础组件\n---\n'],
      contentLines,
      ['## API\n'],
      fusionContentLines.splice(fusionApiIndex + 4),
    );
    generateCode = _.join(generateCode, '\n');

    fs.writeFile(path.join(baseComponentsPath, item), generateCode);
  });
});
```

## demo

````javascript
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

// 运行这个脚本之前，把这个参数改成本地fusion仓库的docs目录
const fusionDocs = 'fusionDocs';

const root = path.join(__dirname, '../');

const blocklist = [
  'pagination/demo/react-router.md',
  'config-provider/demo/components.md',
];

glob('*/demo/*.md', { cwd: fusionDocs }, (err, res) => {
  if (err) throw err;
  res
    .filter(demoFile => !blocklist.includes(demoFile))
    .forEach(demoFile => {
      const match = /^(.*?)\/demo\/(.*)\.md/.exec(demoFile);
      const componentName = match[1];
      const demoFilePath = match[2];
      const content = fs.readFileSync(path.join(fusionDocs, demoFile), 'utf8');
      const contentLines = content.split('\n');
      // 获取demo标题
      const title = /^\s*# (.*)/.exec(content)[1];
      // 获取demo描述
      let description = contentLines.find(line => {
        return line && !line.startsWith('#') && !line.startsWith('-');
      });
      // 这个demo没有描述
      if (description.startsWith(':::')) description = '';
      description = description.replace(/\</g, '&lt;');
      description =
        description.indexOf("'") > -1 ? `"${description}"` : `'${description}'`;
      assert(title);
      // 提取demo的代码块内容
      const demo = /```\s*jsx([\s\S]*?)```/.exec(content)[1];
      assert(demo);
      // 解析ReactDOM.render(<JSX />, mountNode);语句
      const reactdom_render_regexp = /^ReactDOM\.render\(([\s\S]*),\s*mountNode\s*(?:,\s*)?\);?/m;
      if (
        content.match(
          /^ReactDOM\.render\(([\s\S]*),\s*mountNode\s*(?:,\s*)?\);?/gm,
        ).length !== 1
      ) {
        throw new Error(`unexpected demo: ${demoFile}
      has multiple ReactDOM.render`);
      }
      // 提取JSX
      const renderJSX = reactdom_render_regexp.exec(content)[1];
      assert(renderJSX);

      // 提取css
      const cssMatch = /```\s*css([\s\S]*?)```/.exec(content);
      const css = cssMatch ? cssMatch[1] : '';

      // 产生的demo不应该直接调用ReactDOM.render，而是export一个DemoComponent
      let generateCode = demo.replace(reactdom_render_regexp, '');
      generateCode = generateCode.replace(
        /from ['"]@alifd\/next['"]/,
        `from '@b-design/ui'`,
      );
      generateCode = generateCode.replace(
        /from ['"]react-router['"]/,
        `from 'react-router-dom'`,
      );

      generateCode += `export default function DemoComponent() {
      const content = (${renderJSX})
      return (
        <section style={{ background: '#ffffff', padding: '0px 10px 40px', boxSizing: 'border-box' }}>
          <h2>${title}</h2>
          <p dangerouslySetInnerHTML={{
            __html:  ${description}
          }} />
          <Style>{content}</Style>
        </section>
      )
    }`;

      generateCode += '\n';
      generateCode += `const Style = styled.div\`${css}\`;`;
      generateCode = `import styled from 'styled-components';\n` + generateCode;

      if (
        !/import React/.test(generateCode) &&
        !/import * as React/.test(generateCode)
      )
        generateCode = `import * as React from 'react';\n` + generateCode;

      if (componentName === 'grid' && demoFilePath === 'type') {
        generateCode =
          `import * as ReactDOM from 'react-dom';\n` + generateCode;
      }
      assert(!/@alifd\/next/.test(generateCode), generateCode);
      const writePath = path.join(
        root,
        `src/docs/${componentName}/demo/${demoFilePath}.jsx`,
      );
      fs.ensureDirSync(path.dirname(writePath));
      fs.writeFileSync(writePath, generateCode);
    });
});
````
