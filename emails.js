var mongoose = require('mongoose');

var emailSchema = mongoose.Schema({
	email: String
})

var email = mongoose.model('Email', emailSchema);

exports.create = function(req, res){
  if (!req.param('email')) {
    res.send('Email not valid');
    res.statusCode = 400;
  } else {
    var email = new Email({ email: req.param('email')});
    console.log(email);
    email.save(function (err, item) {
      if (err) return console.error(err);
      res.send("adding " + email);
    });
  }
};