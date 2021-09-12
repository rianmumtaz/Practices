const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validator = require("validator");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("login", { layout: "layouts/startpage" })
);

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register", { layout: "layouts/startPage" })
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];
  //validate password should be the same
  if (!validator.equals(password, password2))
    errors.push({ msg: "Password is not valid" });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.error(err);
                req.flash(
                  "error_msg",
                  "Something went wrong when creating user"
                );
                res.redirect("/users/register");
              } else {
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    req.flash(
                      "success_msg",
                      "You are now registered and can log in"
                    );
                    res.redirect("/users/login");
                  })
                  .catch((err) => {
                    console.error(err);
                    req.flash(
                      "error_msg",
                      "Something went wrong, cannot register"
                    );
                    res.redirect("/users/register");
                  });
              }
            });
          });
        }
      })
      .catch((err) => {
        console.error(err);
        req.flash("error_msg", "Something wrong, cannot register");
        res.redirect("/users/register");
      });
  }
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
