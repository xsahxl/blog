// 定义一个有依赖的模块
define(['dataService'], function (dataService) {
  const msg = 'alerter.js';

  function showMsg() {
    return msg + dataService.getName();
  }
  return { showMsg };
});
