"use strict";

var _module = require("./module");
console.log(_module.counter); // 3
(0, _module.incCounter)();
console.log(_module.counter); // 4

(0, _module.foo)();
(0, _module.bar)();