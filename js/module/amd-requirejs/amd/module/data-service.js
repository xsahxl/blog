// 定义一个没有依赖的模块
define(function () {
  const name = 'data-service.js';

  function getName() {
    return name;
  }
  return { getName };
});
