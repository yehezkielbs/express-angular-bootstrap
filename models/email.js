var Deferred = require('JQDeferred'),
  _ = require('lodash');

exports.Sample = function (mongoose) {
  var schema = new mongoose.Schema({
    name: 'String',
    description: 'String'
  });

  var Sample = mongoose.model('Sample', schema);

  return Sample;
};
