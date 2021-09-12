const express = require("express");
const router = express.Router();
const User = require("../model/User");
const {
  whenError,
  whenWarning,
  createNewUser,
  sendEmail,
  verifyActivation,
  createNewToken,
  login,
  verifyLogin,
  loginStat,
} = require("./functions/eventHandler");

router.get("/", loginStat, (req, res) => {
  res.render("home");
});

router.post("/contactMe", (req, res) => {
  sendEmail(
    req,
    res,
    "EUCALC: Contact Me",
    "Thank you for your attention. I will get back to you soon.",
    "",
    true
  );
});

router.get("/login", loginStat, (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        whenError(
          req,
          res,
          err,
          "/",
          "Something went wrong. We'll fix this soon..."
        );
      } else {
        if (user) {
          if (user.isActivated) {
            login(req, res, user);
          } else {
            whenWarning(
              req,
              res,
              "",
              "/login",
              "This email is registered but not activated yet. Check your email and activate it."
            );
          }
        } else {
          whenWarning(req, res, "", "/login", "This email is not registered");
        }
      }
    }
  );
});

router.get("/register", loginStat, (req, res) => {
  res.render("register");
});

router.post("/register", loginStat, (req, res) => {
  const form = req.body;
  let validations = [];
  if (form.password !== form.confirmPassword) {
    validations.push({
      msg: "Password is not the same.",
    });
    res.render("register", {
      validations,
      form,
    });
  } else {
    User.findOne(
      {
        email: form.email,
      },
      function (err, user) {
        if (err) {
          whenError(
            req,
            res,
            err,
            "/",
            "Something went wrong. We'll fix this soon..."
          );
        } else {
          if (user) {
            whenWarning(
              req,
              res,
              user,
              "/register",
              "This email has been registered."
            );
          } else {
            createNewUser(req, res, form);
          }
        }
      }
    );
  }
});

router.get("/activate", verifyActivation, (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.user.email,
    },
    {
      isActivated: true,
    },
    function (err, user) {
      if (err) {
        whenError(
          req,
          res,
          err,
          "/",
          "Something went wrong. We'll fix this soon..."
        );
      } else {
        if (user) {
          req.flash("success", "Account activated");
          res.redirect("/login");
        } else {
          whenError(
            req,
            res,
            "",
            "/register",
            "Something went wrong. Account is not found"
          );
        }
      }
    }
  );
});

router.get("/reactivate", loginStat, (req, res) => {
  res.render("reactivate");
});

router.post("/reactivate", (req, res) => {
  createNewToken(req, res);
});

router.get("/database", verifyLogin, (req, res) => {
  res.render("database");
});

router.get("/logout", (req, res) => {
  res.clearCookie("at_log");
  res.clearCookie("rt_log");
  req.flash("success", "Logged out");
  res.redirect("/");
});

module.exports = router;
