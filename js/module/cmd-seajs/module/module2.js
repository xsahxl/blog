define(function (require, exports, module) {
  const msg = 'module2';
  function showMsg() {
    console.log(msg);
  }

  module.exports = { showMsg };
});
