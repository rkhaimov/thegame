import http from 'http';
import fs from 'fs';
import path from 'path';
import { debounce } from 'lodash';

fs.watch(path.join(__dirname, '..', 'bundled'), debounce((event, file) => {
  console.log(event, file);
}, 100));

http.createServer(function (request, response) {
  if (request.url === '/') {
    return fs.readFile(path.join(process.cwd(), 'index.html'), (error, content) => {
      if (error !== null) {
        throw error;
      }

      response.writeHead(200);
      response.end(content);
    });
  }

  const url = request.url;

  if (url === undefined) {
    return;
  }

  const resolved = path.extname(url) ? path.join(__dirname, '..', url) : path.join(__dirname, '..', `${url}.js`);

  fs.exists(resolved, exists => {
    if (exists) {
      return fs.readFile(resolved, (error, content) => {
        if (error !== null) {
          throw error;
        }

        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(content, 'utf-8');
      });
    }

    response.writeHead(404);
    response.end();
  });
}).listen(8080);

console.log('Running');
