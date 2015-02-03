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
	if (!req.param('item')) {
        res.send('Item not valid');
        res.statusCode = 400;
  } else {
  var opportunity = new Opportunity({ opportunity: req.param('opportunity')});
  	console.log(opportunity);
  	opportunity.save(function (err, item) {
    	if (err) return console.error(err);
    	res.render('opportunities', {stylesheet: opportunities});
  	});
	}
};