var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// define the schema for our opportunity model
var opportunitySchema = mongoose.Schema({
		title					: String,  
  	status		 		: String,
  	requirements  : String,
  	timeestimate	: String,
  	price					: Number
});

var Opportunity = mongoose.model('Opportunity', opportunitySchema);

exports.create = function(req, res){
  var opportunity = new Opportunity({
  	title					: req.param('title'),
		status		 		: req.param('status'),
		requirements  : req.param('requiremements'),
		timeestimate	: req.param('timeestimate'),
		price					: req.param('price')
  });
  	console.log(opportunity);
  	opportunity.save(function (err, item) {
    	if (err) return console.error(err);
    	res.render('opportunities', {stylesheet: 'opportunities'});
  });
};

exports.findAll = function(req, res){
	return Opportunity.find();
};