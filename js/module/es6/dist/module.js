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