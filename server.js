'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let contentType = 'text/html; charset=utf-8';
  let file = 'index.html';

  if (req.url === '/bundle.js') {
    contentType = 'application/javascript; charset=utf-8';
    file = 'bundle.js';
  }

  const filepath = path.join(__dirname, 'dist', file);

  fs.stat(filepath, (err, stat) => {
    if (err) throw err;
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size
    });
    fs.createReadStream(filepath).pipe(res);
    console.log(`Responding to '${req.url}' with '${file}'`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
