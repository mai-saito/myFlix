const http = require('http')
      url = require('url'),
      fs = require('fs');

http.createServer((request, response) => {
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

  if(q.pathname.includes('documentation')){
    filePath = (_dirname + '/documentation.html');
  }else{
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err, data){
    if(err){
      console.log(err);
    }else{
    response.writeHand(200, {'Content-Type': 'text/plain'});
    response.write(data);
    response.end();
    }
  });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.')
