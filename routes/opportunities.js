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
  	title					: req.params('title'),
		status		 		: req.params('status'),
		requirements  : req.params('requiremements'),
		timeestimate	: req.params('timeestimate'),
		price					: req.params('price')
  });
  	console.log(opportunity);
  	opportunity.save(function (err, item) {
    	if (err) return console.error(err);
    	res.render('opportunities', {stylesheet: opportunities});
  	});
	});
};