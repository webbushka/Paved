var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// define the schema for our opportunity model
var companySchema = mongoose.Schema({
		name					: String,
		opportunities	: [
			{
				position			: String,
				status				: String,
  			requirements  : String,
  			timeestimate	: String,
  			price					: Number 
			}
		]
});

var Company = mongoose.model('Company', companySchema);

exports.create = function(req, res){
  var company = new Company({
  	name					: req.param('name'),
  	position			: req.param('position'),
		status		 		: req.param('status'),
		requirements  : req.param('requirements'),
		timeestimate	: req.param('timeestimate'),
		price					: req.param('price')
  });
  	console.log(company);
  	company.save(function (err, item) {
    	if (err) return console.error(err);
    	res.render('opportunities', {stylesheet: 'opportunities'});
  });
};

exports.find = function(req, res) {
	return Company.find(function (err, opps) {
		console.log(opps);
		console.log("made it");
		if (err) return console.log(err);
			res.render('opportunities', { stylesheet: 'opportunities', companies: opps });
	});
};