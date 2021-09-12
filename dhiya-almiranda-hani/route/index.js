const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const handler = require("../helper/handler");
const sendMail = require("../config/transporter");
const jwt = require("jsonwebtoken");
const verifyToken = require("../config/auth");

router.get("/", (req, res) => {
  res.render("index.ejs", { layout: "layouts/layout-index" });
});

router.post("/", (req, res) => {
  sendMail(
    req,
    res,
    req.body.email,
    "tes baru",
    "Plaintext version never get executed if html exist.",
    "<h1>HTML version of the message</h1>"
  );
});

router.get("/reactivate", (req, res) => {
  //to be continued
  console.log(req.cookies.jwt);
  res.render("index.ejs", { layout: "layouts/layout-index" });
});

router.get("/activate", verifyToken, (req, res) => {
  User.findOneAndUpdate(
    { email: req.user.email },
    { isActivated: true },
    function (err, user) {
      if (err) {
        handler(
          "error",
          "Error! Cannot activate your account. Do it again later.",
          "/",
          req,
          res,
          err
        );
      } else {
        if (user) {
          req.flash("success", "Account activated");
          res.redirect("/");
        } else {
          handler("error", "Error! Account is not found.", "/", req, res);
        }
      }
    }
  );
});

router.post("/register", (req, res) => {
  //Check if email registered?
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (err) {
      handler(
        "error",
        "Error! Cannot register a new account. Do it again later.",
        "/",
        req,
        res,
        err
      );
    } else {
      if (user) {
        //check if its activated or not
        if (user.isActivated) {
          handler(
            "success",
            "This email has been registered and activated. You can login now.",
            "/",
            req,
            res
          );
        } else {
          try {
            const payload = {
              email: user.email,
            };
            const accTok_activ = await jwt.sign(
              payload,
              process.env.ats_activ,
              {
                expiresIn: process.env.ate_activ,
              }
            );
            const refTok_activ = await jwt.sign(
              payload,
              process.env.rts_activ,
              {
                expiresIn: process.env.rte_activ,
              }
            );

            sendMail(
              req,
              res,
              user.email,
              "RELEARN: Activation",
              "",
              "<h3>Hi, thank you for signing up.</h3><p>Please activate your account by click this <a href='http://localhost:3000/activate?ref=" +
                refTok_activ +
                "&acc=" +
                accTok_activ +
                "'>link.</a></p>"
            );
          } catch (err) {
            handler(
              "error",
              "Error! Failed to create token. Do it again later.",
              "/",
              req,
              res,
              err
            );
          }
        }
      } else {
        //create new user
        //assume password and confirm password valid
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            handler(
              "error",
              "Error! Cannot register a new account. Do it again later.",
              "/",
              req,
              res,
              err
            );
          } else {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              // Store hash in your password DB.
              if (err) {
                handler(
                  "error",
                  "Error! Cannot register a new account. Do it again later.",
                  "/",
                  req,
                  res,
                  err
                );
              } else {
                const newUser = new User({
                  email: req.body.email,
                  password: hash,
                });
                newUser
                  .save()
                  .then((user) => {
                    handler(
                      "success",
                      "Success! Thank you, you can login now.",
                      "/",
                      req,
                      res,
                      "",
                      user
                    );
                  })
                  .catch((err) => {
                    handler(
                      "error",
                      "Error! Cannot register a new account. Do it again later.",
                      "/",
                      req,
                      res,
                      err
                    );
                  });
              }
            });
          }
        });
      }
    }
  });
});

router.post("/login", (req, res) => {
  console.log("login = ", req.body);
  res.render("index", { layout: "layouts/layout-index" });
});

module.exports = router;
