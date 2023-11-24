define(function (require, exports, module) {
  const msg = 'module3';
  function showMsg() {
    console.log(msg);
  }

  module.exports = { showMsg };
});
