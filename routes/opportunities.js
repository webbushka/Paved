var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// define the schema for our opportunity model
var opportunitySchema = mongoose.Schema({
		company				: String,
		position			: String,  
  	status		 		: String,
  	requirements  : String,
  	timeestimate	: String,
  	price					: Number
});

var Opportunity = mongoose.model('Opportunity', opportunitySchema);

exports.create = function(req, res){
  var opportunity = new Opportunity({
  	company				: req.param('company'),
  	position			: req.param('position'),
		status		 		: req.param('status'),
		requirements  : req.param('requirements'),
		timeestimate	: req.param('timeestimate'),
		price					: req.param('price')
  });
  	console.log(opportunity);
  	opportunity.save(function (err, item) {
    	if (err) return console.error(err);
    	res.render('opportunities', {stylesheet: 'opportunities'});
  });
};

exports.find = function(req, res) {
	return Opportunity.find(function (err, opps) {
		console.log(opps);
		console.log("made it");
		if (err) return console.log(err);
			res.render('opportunities', { stylesheet: 'opportunities', opportunities: opps });
	});
};