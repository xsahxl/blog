// 定义一个有依赖的模块
(function (window, dataService) {
  const msg = 'alerter.js';

  function showMsg() {
    return msg + dataService.getName();
  }

  window.alerter = { showMsg };
})(window, dataService);
