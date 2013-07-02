#!/usr/bin/env node

var express = require('express'),
  resource = require('express-resource'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  config = require('config'),
  models = require('./models'),
  assetManager = require('connect-assetmanager');

var app = express();

var assetManagerOption = {
  js: {
    route: /\/javascripts\/all\.js/,
    path: './assets/js/',
    dataType: 'javascript',
    files: [
      'angular/angular.js',
      'angular/angular-resource.js',
      'controllers.js',
      'services.js',
      'directives.js',
      'app.js'
    ],
    debug: false
  }
};

app.configure('all', function () {
  var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');
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
  app.use(require('less-middleware')({
    src: path.join(__dirname, 'assets', 'less'),
    paths: [path.join(bootstrapPath, 'less')],
    dest: path.join(__dirname, 'public', 'stylesheets'),
    prefix: '/stylesheets'
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function () {
  app.use(assetManager(assetManagerOption));
});

app.configure('development', function () {
  app.use(express.errorHandler());

  assetManagerOption.js.debug = true;
  app.use(assetManager(assetManagerOption));
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
