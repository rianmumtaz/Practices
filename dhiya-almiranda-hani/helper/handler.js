module.exports = function (cat, msg, route, req, res, err, data) {
  if (data) console.log(data);
  if (err) console.error(err);

  req.flash(cat, msg);
  res.redirect(route);
};
