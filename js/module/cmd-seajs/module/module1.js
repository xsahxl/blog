define(function (require, exports, module) {
  const msg = 'module1';
  function showMsg() {
    console.log(msg);
  }

  module.exports = { showMsg };
});
