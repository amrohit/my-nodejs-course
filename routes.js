const fs = require('fs');
const requestHandler = (req, res) => {
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
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    //Node JS provides you event drive architecure(no blocking operation)
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      //   fs.writeFileSync('message.txt', message);
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
      //res.writeHead(302, {})
    });
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
};

// module.exports = requestHandler;
//or this way
// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text',
// };
//or
// module.exports.handler = requestHandler;
// module.someText = 'Some hard coded text'

//or

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
