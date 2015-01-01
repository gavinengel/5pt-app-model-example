var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  flash    = require('connect-flash'),
  morgan       = require('morgan'),
  cookieParser = require('cookie-parser'),
  session      = require('express-session');
 // port = parseInt(process.env.PORT, 10) || 4000;


var init = require('./config/init')(),
  config = require('./config/config'),
  mongoose = require('mongoose');



//keeping database conn in server.js for usability -- could move to config section
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var db = mongoose.connect(configDB.url, function (err) {
  if (err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});



app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser()); // get information from html forms
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));


var Hegel = require('./app/models/hegel');
var User = require('./app/models/user');



// set up our express application
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//app.set('view engine', 'ejs'); // set up ejs for templating
require('./config/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({ secret: 'unicorn' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// load up the user model


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport






console.log("Listening at http://localhost:" + config.port);
app.listen(config.port);
