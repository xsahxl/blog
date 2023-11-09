# jsx-control-statements

JSX-Control-Statements 是一个 React 库，它扩展了 JSX 语法，使得我们可以在 JSX 中使用 if、else、for 等控制语句。这样，我们就可以更加方便地编写 React 组件。

## 安装依赖

```javascript
npm i babel-plugin-jsx-control-statements eslint-plugin-jsx-control-statements --save-dev
```

## 根目录下新建 .babelrc 文件

```javascript
{
  "plugins": ["jsx-control-statements"]
}
```

## 修改 .eslintrc 文件

```javascript
{
  "parser": "babel-eslint",
  "extends": ["plugin:jsx-control-statements/recommended"],
  "rules": {
    "semi": [2, "always"],
    "space-before-function-paren": 0,
    "arrow-parens": 0,
    "react/jsx-no-undef": 0,
    "max-len": 0,
    "react/no-danger": 0,
    "jsx-control-statements/jsx-jcs-no-undef": 0
  }
}

```

执行以上操作，重新启动编辑器就可以愉快的玩耍了 😊😊😊

下面是一个简单的例子，演示了如何在 JSX 中使用 if 语句：

```ts
import If from 'jsx-control-statements';

function Example(props) {
  const { isLoggedIn } = props;
  return (
    <div>
      <If condition={isLoggedIn}>
        <p>Welcome back!</p>
      </If>
      <If condition={!isLoggedIn}>
        <p>Please log in.</p>
      </If>
    </div>
  );
}
```

在上面的例子中，我们使用了 If 组件来根据用户是否已登录，显示不同的文本。如果 isLoggedIn 为 true，则显示 “Welcome back!”，否则显示 “Please log in.”。

除了 if 语句，JSX-Control-Statements 还支持其他控制语句，比如 for 和 switch。下面是一个使用 for 语句的例子：

```ts
import For from 'jsx-control-statements';

function Example(props) {
  const { items } = props;
  return (
    <ul>
      <For each="item" of={items}>
        <li>{item}</li>
      </For>
    </ul>
  );
}
```

在上面的例子中，我们使用了 For 组件来遍历 items 数组，并在每个元素上渲染一个 li 元素。

JSX-Control-Statements 的语法十分直观和简洁，让我们能够更加方便地表达组件的逻辑。如果你正在学习 React 或者需要编写复杂的组件，那么我建议你尝试一下 JSX-Control-Statements。

## [demo 仓库](https://github.com/xsahxl/jsx-control-statments)
