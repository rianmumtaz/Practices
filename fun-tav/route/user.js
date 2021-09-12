const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Newsletter = require("../model/Newsletter");
const {
  whenError,
  whenWarning,
  whenSuccess,
} = require("./functions/event_handler");
const {
  createNewUser,
  verifyActivation,
  createNewToken,
  login,
  verifyLogin,
  sendEmailActivation,
  loginStat,
} = require("./functions/login_register");

//daftar page
router.get("/daftar", verifyLogin, (req, res) => {
  res.render("body/register", {
    layout: "layouts/login_register",
  });
});

//daftar submit
router.post("/daftar", loginStat, (req, res) => {
  const form = req.body;
  let validations = [];
  if (form.password !== form.confirm_password) {
    validations.push({
      msg: "Password is not the same.",
    });
    res.render("body/register", {
      layout: "layouts/login_register",
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
            "Terjadi kesalahan sistem, coba lagi nanti"
          );
        } else {
          if (user) {
            whenWarning(
              req,
              res,
              user,
              "/user/daftar",
              "Email ini sudah terdaftar"
            );
          } else {
            //if user checked the newsletter checkbox
            if (form.newsletter) {
              Newsletter.findOne({ email: form.email }, function (err, email) {
                if (err) {
                  console.error(err);
                  return;
                } else {
                  if (email) {
                    return;
                  } else {
                    new Newsletter({ email: form.email })
                      .save()
                      .then(() => {
                        return;
                      })
                      .catch((err) => {
                        console.error(err);
                        return;
                      });
                  }
                }
              });
            }
            createNewUser(req, res, form);
          }
        }
      }
    );
  }
});

//activate account after user click activation link in their email
router.get("/activate", verifyLogin, verifyActivation, (req, res) => {
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
          "Terjadi kesalahan sistem, coba lagi nanti"
        );
      } else {
        if (user) {
          req.flash("success", "Account activated");
          res.redirect("/user/masuk");
        } else {
          whenError(
            req,
            res,
            "",
            "/",
            "Terjadi kesalahan sistem, coba lagi nanti"
          );
        }
      }
    }
  );
});

//when token is expired, open this page to ask user if thay want to resend the activation email
router.get("/reactivate", verifyLogin, (req, res) => {
  res.render("body/reactivate", {
    layout: "layouts/login_register",
  });
});

//when user click resend for email activation, create new access token and resend to their email
router.post("/reactivate", (req, res) => {
  createNewToken(req, res);
});

//masuk Page
router.get("/masuk", verifyLogin, (req, res) => {
  res.render("body/login", {
    layout: "layouts/login_register",
  });
});

//masuk submit
router.post("/masuk", (req, res) => {
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
          "Terjadi kesalahan sistem, coba lagi nanti"
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
              "/user/masuk",
              "Email ini sudah terdaftar namun belum diaktivasi. Cek email Anda untuk mengaktivasi"
            );
          }
        } else {
          whenWarning(req, res, "", "/user/masuk", "Email ini belum terdaftar");
        }
      }
    }
  );
});

//resending email activation page
router.get("/resend", verifyLogin, (req, res) => {
  res.render("body/resend", {
    layout: "layouts/login_register",
  });
});

//resending email activation submition
//check whether or not the submitted email already registered and not activated
router.post("/resend", (req, res) => {
  User.findOne(req.body, function (err, user) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan sistem, coba lagi nanti"
      );
    } else {
      if (user) {
        if (!user.isActivated) {
          sendEmailActivation(req, res, user);
        } else {
          whenSuccess(
            req,
            res,
            "",
            "/user/resend",
            "Email sudah terdaftar dan teraktivasi"
          );
        }
      } else {
        whenWarning(req, res, "", "/user/resend", "Email belum terdaftar");
      }
    }
  });
});

//logout
router.get("/keluar", (req, res) => {
  res.clearCookie("at_log");
  res.clearCookie("rt_log");
  req.flash("success", "Logged out");
  res.redirect("/");
});

module.exports = router;
