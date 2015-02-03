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

module.exports = mongoose.model('Opportunity', opportunitySchema);