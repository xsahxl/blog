(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _module = require("./module");
console.log(_module.counter); // 3
(0, _module.incCounter)();
console.log(_module.counter); // 4

(0, _module.foo)();
(0, _module.bar)();
},{"./module":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;
exports.counter = void 0;
exports.foo = foo;
exports.incCounter = incCounter;
var _counter;
function foo() {
  console.log('foo');
}
function bar() {
  console.log('bar');
}
let counter = exports.counter = 3;
function incCounter() {
  _counter = counter++, exports.counter = counter, _counter;
}
},{}]},{},[1]);
