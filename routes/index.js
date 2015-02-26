//var emails = require('../emails');
var express = require('express');
var passport = require('passport');
var opportunities = require('./opportunities');
var router = express.Router();

/* GET home page. */

router
	/*
	.get('/', function(req, res) {
  	res.render('landing-page.hbs', { layout: false });
	})
	.post('/', emails.create);
	*/
	.get('/', function(req, res) {
		res.render('index', { stylesheet: 'index' });
	})
	.get('/opportunities', opportunities.find)
	.get('/focused', function(req, res) {
		res.render('focused', { stylesheet: 'focused' });
	})
	.get('/payment-form', function(req, res) {
		res.render('payment-form', { stylesheet: 'payment-form' });
	})
	.get('/admin', isLoggedIn, function(req, res) {
		res.render('admin', { stylesheet: 'admin' });
	})
	.post('/admin', opportunities.create)
	.get('/sign-up', function(req, res) {
		res.render('sign-up', {layout: false});
	})
	// process the signup form
  .post('/sign-up', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/sign-up', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }))
  .get('/log-in', function(req, res) {
		res.render('log-in', {layout: false});
	})
  .post('/log-in', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/log-in', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  console.log('here');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/log-in');
}

var requiresAdmin = function() {
  return [
    isLoggedIn('/admin'),
    function(req, res, next) {
      if (req.user && req.user.isAdmin === true)
        next();
      else
        res.send(401, 'Unauthorized');
    }
  ]
};

module.exports = router;