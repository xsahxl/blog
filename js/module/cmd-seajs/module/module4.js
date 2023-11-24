define(function (require, exports, module) {
  const msg = 'module4';
  function showMsg() {
    console.log(msg);
  }

  // 同步加载
  const module1 = require('./module2');
  module1.showMsg();

  // 异步加载
  require.async('./module3', function (module3) {
    module3.showMsg();
  });
  module.exports = { showMsg };
});
