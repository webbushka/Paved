var formidable = require('formidable');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.upload = function(req) {
	console.log(req.body);
	return console.log(req.files);
  var filename = req.body.file_upload;
  fs.createReadStream(filename).pipe(res);
  var params = {
    Bucket: 'paved-test',
    Key: filename
  };
  s3.upload(params)
    .on('httpUploadProgress', function(evt) {
      console.log(evt);
    })
    .send(function(err, data) {
      console.log(err, data);
      cb(err, data);
    });
};
