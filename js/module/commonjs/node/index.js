const module1 = require('./modules/module1');
module1.foo();

const module2 = require('./modules/module2');
module2();
const module3 = require('./modules/module3');
console.log(module3);
module3.foo();
module3.bar();
