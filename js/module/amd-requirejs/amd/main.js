// 主模块 https://requirejs.org/docs/api.html

requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: './module',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    dataService: './data-service',
    alerter: './alerter',
  },
});

// Start the main app logic.
requirejs(['alerter'], function (alerter) {
  document.body.innerHTML = alerter.showMsg();
});
