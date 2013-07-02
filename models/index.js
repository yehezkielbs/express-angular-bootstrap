var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  config = require('config'),
  mongoose = require('mongoose');

var models = {};

mongoose.connect(config['mongodb']['url']);

_.each(fs.readdirSync(__dirname), function (file) {
  var fullPath = path.join(__dirname, file), factories;
  if (fullPath !== __filename) {
    factories = require(fullPath);
    _.each(factories, function (factory, name) {
      models[name] = factory(mongoose, models);
    });
  }
});

module.exports = models;
