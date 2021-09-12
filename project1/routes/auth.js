const express = require("express");
const router = express.Router();
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

//login
router.get(
  "/google",
  forwardAuthenticated,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  forwardAuthenticated,
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })
);

module.exports = router;
