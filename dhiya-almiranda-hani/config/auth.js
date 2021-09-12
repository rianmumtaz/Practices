const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  jwt.verify(req.query.acc, process.env.ats_activ, function (err, decoded) {
    if (err) {
      console.error(err);
      res.cookie("jwt", req.query.ref, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });
      req.flash("error", "Token expired or error.");
      res.redirect("/reactivate");
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
