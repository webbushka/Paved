//var emails = require('../emails');
var fs = require('fs');
var express = require('express');
var passport = require('passport');
var companies = require('../models/opportunities');
var router = express.Router();
var user = require('../models/users');
var stripe = require('stripe')("sk_test_r6CoQNy1HzO4cfqEDqS6D4I8");
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var path = require('path');

/* GET home page. */

router
	/*
	.get('/', function(req, res) {
  	res.render('landing-page.hbs', { layout: false });
	})
	.post('/', emails.create);
	*/
	.get('/', function (req, res) {
		res.render('index', { stylesheet: 'index' });
	})
	.get('/opportunities', function (req, res) {
		companies.find(req, function (err, opps) {
			// if (req.get('content-type') === 'application/json') {
			// 	return res.json(opps);
			// }
			if(err) return console.log(err);
			opps.forEach(function(company) {
				company.opportunities.forEach(function(opp, i, list) {
					list[i].companyId = company._id;
				});
			});
			res.render('opportunities', {stylesheet: 'opportunities', companies: opps});
		});
	})
	.get('/opportunities/:companyId/evaluation/:id', isLoggedIn, function (req, res) {
		res.render('payment-form', { stylesheet: 'payment-form' });
	})
	.post('/opportunities/:companyId/evaluation/:id', function (req, res, next) {
		//Obtain StripeToken
		var stripeToken = req.body.stripeToken;

		var charge = {
    amount: 1000,
    currency: 'USD',
    source: stripeToken,
    description: "Example charge"
  	};

  	console.log(stripeToken);

		stripe.charges.create(charge, function(err, charge) {
		  if (err && err.type === 'StripeCardError') {
		    // The card has been declined
		    return next (err);
		  }
		  else {
		  	companies.show(req, res);
		  }
		});
	})
	.get('/opportunities/:companyId/evaluation/:id/upload', function (req, res) {
		res.render('index', { stylesheet: 'index' });
	})
	.get('/opportunities/:companyId/evaluation/:id/upload', function (req, res) {
		companies.findEvalFile(req, res, function(filename) {
			var params = {Bucket: 'paved-test', Key: filename};
			var file = fs.createWriteStream(path.join(__dirname, filename));
			s3.getObject(params)
			.on('httpData', function(chunk) { file.write(chunk); })
			.on('httpDone', function(data) {
				file.end(function (err, result) {
					res.setHeader('content-type', data.httpResponse.headers['content-type']);
					fs.createReadStream(file.path).pipe(res);
						fs.unlinkSync(file.path);
				});
			})
			.send();
		});
	})
	.get('/admin', isLoggedIn, function (req, res) {
		companies.find(req, function (err, opps) {
			if(err) return console.log(err);
			res.render('admin', { stylesheet: 'admin', companies: opps });
		});
	})
	.post('/admin', function(req, res){
		if(req.body.method === 'post') companies.create(req, res);
		else companies.update(req, res);
	})
	.get('/sign-up', function (req, res) {
		res.render('sign-up', {layout: false});
	})
	// process the signup form
  .post('/sign-up', function(req, res, next) {
	  passport.authenticate('local-signup', function(err, user, info) {
	    //This is the default destination upon successful login
	    var redirectUrl = '/';

	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/'); }

	    //If we have previously stored a redirectUrl, use that,
	    // otherwise, use the default
	    if (req.session.redirectUrl) {
	    	redirectUrl = req.session.redirectUrl;
	    	req.session.redirectUrl = null;
	    }

	    req.logIn(user, function(err){
	    	if (err) { return next(err); }
	    });
	    res.redirect(redirectUrl);
		})(req, res, next);
  })
  .get('/log-in', function (req, res) {
		res.render('log-in', {layout: false});
	})
  .post('/log-in', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
	    //This is the default destination upon successful login
	    var redirectUrl = '/';

	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/'); }

	    //If we have previously stored a redirectUrl, use that,
	    // otherwise, use the default
	    if (req.session.redirectUrl) {
	    	redirectUrl = req.session.redirectUrl;
	    	req.session.redirectUrl = null;
	    }

	    req.logIn(user, function(err){
	    	if (err) { return next(err); }
	    });
	    res.redirect(redirectUrl);
		})(req, res, next);
  });

var custRedir = function (err, user, info) {
	//This is the default destination upon successful login
  var redirectUrl = '/';

  if (err) { return next(err); }
  if (!user) { return res.redirect('/'); }

  //If we have previously stored a redirectUrl, use that,
  // otherwise, use the default
  if (req.session.redirectUrl) {
  	redirectUrl = req.session.redirectUrl;
  	req.session.redirectUrl = null;
  }

  req.logIn(user, function(err){
  	if (err) { return next(err); }
  });
  res.redirect(redirectUrl);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    req.session.redirectUrl = req.url;

    // if they aren't redirect them to the home page
    res.redirect('/log-in');
}

var requiresAdmin = function() {
  return [
    isLoggedIn('/admin'),
    function (req, res, next) {
      if (req.user && req.user.isAdmin === true)
        next();
      else
        res.send(401, 'Unauthorized');
    }
  ]
};

module.exports = router;
