console.log('process.cwd', process.cwd());
const fs = require('fs');

const cwd = process.cwd();
const files = fs.readdirSync(cwd);
console.log('files', files);
