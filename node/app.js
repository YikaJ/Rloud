var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var io = require('./socket/io');
var filter = require('./filter');
var config = require('./config.js');
var db = require('./models/db_connect.js');

// 路由
var routes = require('./routes/index');
var apps = require('./routes/app');
var apis = require('./routes/api');

var app = express();

var sessionMiddleware = session({
  store: new RedisStore(config.session.options),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

// 模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 中间件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.session.secret));
app.use(sessionMiddleware);
// socket.io 共享session
io.use(function(socket, next){
  sessionMiddleware(socket.request, {}, next);
});
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 7 * 24 * 60 * 60
}));

// 路由分发
app.use('/', routes);
app.use('/api', apis);
app.use('/app', filter.authorize.needLogin, apps);

// 最后应用匹配不到相应路由的,则返回一个status:404的错误
app.use(function(req, res, next) {
  var err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
