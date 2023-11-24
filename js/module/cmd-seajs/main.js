define(function (require, exports, module) {
  const module1 = require('./module/module1');
  module1.showMsg();

  const module4 = require('./module/module4');
  module4.showMsg();
});
