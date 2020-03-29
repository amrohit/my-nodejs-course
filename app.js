const http = require('http');
const fs = require('fs');
// function rqListener (req, res) {

// }

// http.createServer(rqListener);

//event driven: if x happens do y
//or if request comes, do this
const server = http.createServer((req, res) => {
  //console.log(req);
  //process.exit();
  res.setHeader('Content-Type', 'text/html');
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write(`
        <html>
        <head>
        <title>
        Get Information
        </title>
        </head>
        <body>
        <form action="/message" method="POST">
        <input type="text" name="message">
        <button type="submit">Submit</button>
        </form>
        </body>
        </html>
      `);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
    //res.writeHead(302, {})
  }
  res.write(`<html>
        <head>
        <title>
        This is title
        </title>
        <body>
        <h1>Hello from my node Js Server</h1>
        </body>
        </head>
    </html>`);
  res.end();
});

server.listen(3000);
