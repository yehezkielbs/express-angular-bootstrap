var _ = require('lodash'),
  Deferred = require('JQDeferred');

exports.setSampleResource = function (app, models) {

  var routes = {
    index: function (req, res) {
      models.Sample.find({}, function (err, rows) {
        if (err) console.error(err);
        res.json(rows);
      });
    },

    show: function (req, res) {
      models.Sample.findById(req.params.sample, function (err, sample) {
        if (err) console.error(err);
        res.json(sample);
      });
    },

    update: function (req, res) {
      models.Sample.findByIdAndUpdate(req.params.sample, _.omit(req.body, '_id', '__v'), function (err, sample) {
        if (err) console.error(err);
        res.json(sample);
      });
    },

    create: function (req, res) {
      models.Sample.create(req.body, function (err, sample) {
        if (err) console.error(err);
        res.json(sample);
      });
    },

    destroy: function (req, res) {
      models.Sample.findByIdAndRemove(req.params.sample, function (err) {
        if (err) console.error(err);
        res.json();
      });
    }
  };

  app.resource('api/samples', routes);
};
