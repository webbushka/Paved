var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var session = require('express-session');
var mongoose = require('mongoose');
var AWS = require('aws-sdk');

AWS.config.update = ({region: 'us-west-2'});

//landing-page mongoose reqs
//var mongo = require('mongodb');
var db = mongoose.connection;
require('./config/passport')(passport);

var routes = require('./routes/index');

var app = express();

// view engine setup
var expressHbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'layout.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: './awsFiles/'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'getpaved' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

mongoose.connect('mongodb://localhost/paved');
db.on('error', function callback () {
    console.error('connection error');
});
db.once('open', function callback () {
    console.error('connection success');
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
