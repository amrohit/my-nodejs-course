const http = require('http');
const routes = require('./routes.js');

// function rqListener (req, res) {

// }

// http.createServer(rqListener);

//event driven: if x happens do y
//or if request comes, do this
// const server = http.createServer(routes);
const server = http.createServer(routes.handler);
console.log(routes.someText);
server.listen(3000);
