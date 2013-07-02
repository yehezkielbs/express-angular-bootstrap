#!/usr/bin/env node

var express = require('express'),
  resource = require('express-resource'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  config = require('config'),
  models = require('./models');

var app = express();

app.configure('all', function () {
  app.set('port', parseInt(process.env.PORT, 10) || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('connect-assets')());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function () {
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Index
app.get('/', routes.index);
// Angular.js partials
app.get(/^\/partials\/(.+)/, routes.partials);
// Resources
routes.setSampleResource(app, models);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
