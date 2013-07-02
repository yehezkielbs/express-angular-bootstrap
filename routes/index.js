var fs = require('fs'),
  path = require('path'),
  _ = require('lodash');

exports.index = function (req, res) {
  res.render('index', { title: 'Express', cookies: req.cookies });
};

_.each(fs.readdirSync(__dirname), function (file) {
  var fullPath = path.join(__dirname, file);
  if (fullPath !== __filename) {
    exports = _.extend(exports, require(fullPath));
  }
});
