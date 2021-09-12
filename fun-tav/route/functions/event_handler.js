const whenError = (req, res, err, redirect, msg) => {
  console.error(err);
  req.flash("error", msg);

  res.redirect(redirect);
};

const whenSuccess = (req, res, data, redirect, msg) => {
  console.log(data);
  req.flash("success", msg);

  res.redirect(redirect);
};

const whenWarning = (req, res, data, redirect, msg) => {
  console.log(data);
  req.flash("warning", msg);

  res.redirect(redirect);
};

module.exports = {
  whenError,
  whenSuccess,
  whenWarning,
};
