// app/routes.js
module.exports = function(app, passport) {

var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var Hegel = require('./models/hegel');
// API ROUTES

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


router.use(function (req, res, next) {
  console.log('Request received');
  next(); // make sure we go to the next routes and don't stop here
});

// test express router
router.get('/', function (req, res) {
  var thedate = new Date();
  res.json({ message: thedate });
});

// more routes for our API will happen here


  //var users = require('../../app/controllers/users');

  // Setting up the users profile api
  //app.route('/users/me').get(users.me);
  //app.route('/users').put(users.update);
  //app.route('/users/accounts').delete(users.removeOAuthProvider);

  // Setting up the users password api
  //app.route('/users/password').post(users.changePassword);
  //app.route('/auth/forgot').post(users.forgot);
  //app.route('/auth/reset/:token').get(users.validateResetToken);
  //app.route('/auth/reset/:token').post(users.reset);

// load up the user model
//var User  = require('./app/models/user');


//var User          = require('./app/models/user');
  User = mongoose.model('User');
// Setting up the users authentication api
router.route('/signup').post(function (req, res) {
  // For security measurement we remove the roles from the req.body object
  //delete req.body.roles;

  // Init Variables
  var user = new User(req.body);
  var message = null;

  // Add missing user fields
  user.provider = 'local';
  //user.displayName = user.firstName + ' ' + user.lastName;

  // Then save the user
  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        "message": err
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      res.json(user);

      //req.login(user, function(err) {
        //if (err) {
          //res.status(400).send(err);
        //} else {
          //res.jsonp(user);
        //}
      //});
    }
  });
});





//AIzaSyCkzQMyNxAk4DUBFalmTrRK21Q9dK0MZKA

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
   router.get('/auth/google/callback',
            passport.authenticate('google', { failureFlash: false }),
            function(req, res) {
                //log.info(req.user.username+' is successfully logged in.');
                //log.info(JSON.stringify(req.user));
                res.send(200);
                res.json(req);

            });

/*
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
*/







 // users.signup);
//app.route('/auth/signin').post(users.signin);
//app.route('/auth/signout').get(users.signout);








//router.route('/signup').post(passport.authenticate('local-signup', {
    //successRedirect : '/profile', // redirect to the secure profile section
    //failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //failureFlash : true // allow flash messages
  //}));
    //successRedirect : '/profile', // redirect to the secure profile section
    //failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //failureFlash : true // allow flash messages
  //});
    //irect back to the signup page if there is an error
    //failureFlash : true // allow flash messages


router.route('/hegel')
  .post(function (req, res) {
    var hegel = new Hegel();
    hegel.thought = req.body.thought;
    hegel.negative = req.body.negative;
    hegel.doublenegative = req.body.doublenegative;
    hegel.synthesis = req.body.synthesis;
    hegel.tense = req.body.tense;
    hegel.ts = new Date();
    // save the hegel
    hegel.save(function (err, data) {
      if (err) {
        for (e in err) {
          if (err.hasOwnProperty(e)) {
            res.send(e + ": " + err[e]);
          }
        }
        //res.send(err);
      }
      //d.message = "Created new Hegel:" + req.body.thought;
      res.json(data);
      //res.json({message: "Created new Hegel:" + req.body.thought});
    });
  })
  .get(function (req, res) {
    Hegel.find(function (err, hegel) {
      if (err) {
        res.send(err);
      }
      res.json(hegel);
    });
  });

router.route('/hegel/:hegel_id')
  .get(function (req, res) {
    Hegel.findById(req.params.hegel_id, function (err, hegel) {
      if (err) {
        res.send(err);
      }
      res.json(hegel);
    });
  })
  .put(function (req, res) {
    Hegel.findById(req.params.hegel_id, function (err, hegel) {
      if (err) {
        res.send(err);
      }
      //update the hegel
      hegel.thought = req.body.thought;  // set the bears name (comes from the request)
      hegel.negative = req.body.negative;
      hegel.doublenegative = req.body.doublenegative;
      hegel.synthesis = req.body.synthesis;
      hegel.tense = req.body.tense;
      hegel.ts = new Date();
      //save the bear
      hegel.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({message: req.body.thought + " (" + req.params.hegel_id + ") updated." });
      });
    });
  })
  .delete(function (req, res) {
    Hegel.remove({
      _id: req.params.hegel_id
    }, function (err, hegel) {
      if (err) {
        res.send(err);
      }
      res.send(res);
      //res.json({message: "Hegel (" + req.params.hegel_id + ") removed."});
    });
  });







  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });


 // ==================================
 // TEST PAGE
 // ==============
  app.get('/blat', function(req, res) {
    res.render('blat.ejs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    //res.render('signup.ejs', { message: req.flash('signupMessage') });
    res.send("in signup");
    res.redirect("/#/signup");
  });

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    //res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
      res.redirect("/profile");
    });


  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));




  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));


  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
//    successRedirect : '/profile', // redirect to the secure profile section
  //  failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
