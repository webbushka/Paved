var express = require('express');
var mongoose = require('mongoose');

var oppSchema = mongoose.Schema({
   position: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   },
   requirements: {
      type: String,
      required: true
   },
   timeestimate: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   }
});

// define the schema for our opportunity model
var companySchema = mongoose.Schema({
   name: String,
   opportunities: [oppSchema]
});

var Company = mongoose.model('Company', companySchema);

var getOpportunity = function(req) {
   var opp = {
      position: req.body.position,
      status: req.body.status,
      requirements: req.body.requirements,
      timeestimate: req.body.timeestimate,
      price: req.body.price,
      description: req.body.description
   };
   return opp;
};

exports.create = function(req, res) {
   var company = new Company({
      name: req.body.name,
      opportunities: [getOpportunity(req)]
   });
   company.save(function(err, item) {
      if (err) return console.error(err);
      res.render('opportunities', {
         stylesheet: 'opportunities'
      });
   });
};

exports.update = function(req, res) {
   Company.findById(req.body.company, function(err, company) {
      if (err) return console.log(err);
      company.opportunities.create(getOpportunity(req));
      company.save(function(err) {
         if (err) return console.log(err);
         res.json(company);
      });
   });
};

exports.find = function(req, done) {
   Company.find(function(err, opps) {
      if (typeof done === 'function') {
         done(err, opps);
      } else {
         throw ('Expects a function as a second argument');
      }
   });
};

exports.show = function(req, res) {
   Company.findById(req.params.companyId, function(err,
      company) {
      if (err) throw err;
      var evaluation = company.opportunities.id(req.params.id);
      res.render('evaluation', {
         stylesheet: 'evaluation',
         company: company,
         opportunity: evaluation
      });
   });
};
