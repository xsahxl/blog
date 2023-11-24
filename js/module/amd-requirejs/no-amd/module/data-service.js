// 定义一个没有依赖的模块
(function (window) {
  const name = 'data-service.js';

  function getName() {
    return name;
  }

  window.dataService = { getName };
})(window);
