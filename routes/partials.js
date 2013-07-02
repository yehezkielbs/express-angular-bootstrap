exports.partials = function (req, res) {
  res.render('partials/' + req.params[0]);
};
