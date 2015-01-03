var loopback = require('loopback');
var boot = require('loopback-boot');
var cors = require('cors');
require('magic-globals');

console.log('__line: ' + __line);
console.log('__file: ' + __file); 
console.log('__ext: ' + __ext); 
console.log('__base: ' + __base);
console.log('__filename: ' + __filename);
console.log('__dirname: ' + __dirname);



var app = module.exports = loopback();

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
app.use(cors());

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
//   var path = require('path');
//   app.use(loopback.static(path.resolve(__dirname, '../client')));
var dataio = require('../data.io/server/ws-server');


// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
