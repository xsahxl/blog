# https://babel.nodejs.cn/docs/usage

# npm run babel

将es6转换成es5, 可以看到大包后的代码用到了require

```js
var _module = require('./module');
(0, _module.foo)();
(0, _module.bar)();
```

# npm run browserify

转换成浏览器可以识别的代码
