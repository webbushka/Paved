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
	console.log(req.body);
  var company = new Company({
  	name					: req.body.name,
  	position			: req.body.position,
		status		 		: req.body.status,
		requirements  : req.body.requirements,
		timeestimate	: req.body.timeestimate,
		price					: req.body.price
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