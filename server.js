var http = require('http');
var useragent = require('useragent');


var server = http.createServer(function(req, res){
  if (req.url === '/api/whoami' && req.method === 'GET') {

    var ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    ip = ip.replace(/^::ffff:/, '');

    var agent = useragent.parse(req.headers['user-agent']);
    var language = req.headers["accept-language"].replace(/[;,].*/, '')
    var headers = req.headers;

    res.write(JSON.stringify({
      language: language,
      os: agent.os.family,
      ipaddress: ip
    }));
    res.end();
  } else {
    res.writeHead(404);
    res.write('Cannot ' + req.method + " " + req.url);
    res.end();
  }

});

server.listen(process.env.PORT || 8080);
