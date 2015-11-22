var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var socketIo = require('socket.io');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/bloglist');

var app = express();
var server = require('http').Server(app);
//var io = socketIo(server);
var io = require('socket.io').listen(server);

var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.post('/blog/new', function(req, res, next) {
  console.log(req);
  console.log(res.body.title);
  console.log(res.body.url);
  console.log(res.body.text);
  console.log(next);
});

var messages = [];

// TODO : /chat
//io.of('/messages').on('connection', function(socket) {
//  console.log('a user connected');
//
//  socket.on('/new', function (data) {
//    messages.push(data);
//    socket.broadcast.emit('/message', data);
//  });
//});


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
