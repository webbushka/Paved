var emails = require('../emails');
var express = require('express');
var router = express.Router();

/* GET home page. */
router
	.get('/', function(req, res) {
  	res.render('landing-page.hbs', {layout: false});
	})
	.post('/', emails.create);


/*
	.post('/', function(req, res) {

		// Set internal DB variable 
		var db = req.db;

		// Get form values. These rely on the "name" attribute
		var email = req.body.email;

		// Set our collection
		var collection = db.get('usercollection');
	});

	.get('/opportunities', function(req, res) {
		res.render('opportunities', { stylesheet: 'opportunities'});
	})
	.get('/focused', function(req, res) {
		res.render('focused', { stylesheet: 'focused'});
	})
	.get('/payment-form', function(req, res) {
		res.render('payment-form', { stylesheet: 'payment-form'});
	});
	.get('/emails', function(req, res) {
		var db = req.db
		var collection = db.get('usercollection');
		collection.find({}, function(e, docs){
			res.render('emails', {
				"emails" : docs
			});
		});
	});
*/

module.exports = router;
