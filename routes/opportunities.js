var express = require('express');
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
  	name					: req.body.company('name'),
  	position			: req.body.company('position'),
		status		 		: req.body.company('status'),
		requirements  : req.body.company('requirements'),
		timeestimate	: req.body.company('timeestimate'),
		price					: req.body.company('price')
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