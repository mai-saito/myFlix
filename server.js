const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {
  var addr = request.url;
  var q = url.parse(addr, true);
  var filePath = '';

  if(q.pathname.includes('documentation')){
    filePath = (_dirname + '/documentation.html');
  }else{
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Url logged');
    }
  });

  fs.readFile(filePath, function(err, data){
    if(err){
      throw err;
    }else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  }
  });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.')
