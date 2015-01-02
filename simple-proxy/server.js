var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxy();

var options = {  
  'www.5pt.gavinengel.com': 'http://53greenst1-5002.terminal.com',
  'api.5pt.gavinengel.com': 'http://53greenst1-5003.terminal.com',
  'example.com': 'http://example2.com:8002'
}

require('http').createServer(function(req, res) {  
  proxy.web(req, res, {
    target: options[req.headers.host]
  });
}).listen(80);
