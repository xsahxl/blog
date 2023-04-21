# jsx-control-statements

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

## [demo 仓库](https://github.com/xsahxl/jsx-control-statments)
