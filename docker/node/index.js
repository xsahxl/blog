const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hi from docker \n');
}).listen(3000);

console.log('Server running at http://127.0.0.1:8080/');