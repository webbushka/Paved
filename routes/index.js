//var emails = require('../emails');
var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */

router
	/*
	.get('/', function(req, res) {
  	res.render('landing-page.hbs', {layout: false});
	})
	.post('/', emails.create);
	*/
	.get('/', function(req, res) {
		res.render('index', { stylesheet: 'index' });
	})
	.get('/opportunities', function(req, res) {
		res.render('opportunities', { stylesheet: 'opportunities' });
	})
	.get('/focused', function(req, res) {
		res.render('focused', { stylesheet: 'focused' });
	})
	.get('/payment-form', function(req, res) {
		res.render('payment-form', { stylesheet: 'payment-form' });
	})
	.get('/sign-up', function(req, res) {
		res.render('sign-up', {layout: false});
	})
	// process the signup form
  .post('/sign-up', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/sign-up', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  console.log('here');
	
module.exports = router;
