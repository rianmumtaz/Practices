const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

function passportLocal(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match User
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return done(null, false, {
              message: "That email is signed in with google account",
            });
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
function passportGoogle(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ email: profile.email })
          .then((user) => {
            if (!user) {
              const newUser = new User({
                name: profile.displayName,
                email: profile.email,
              });
              newUser
                .save()
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => {
                  console.error(err);
                  return done(null, false, { message: "Somethin went wrong" });
                });
            } else {
              return done(null, user);
            }
          })
          .catch((err) => {
            console.error(err);
            return done(null, false, { message: "Somethin went wrong" });
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = { passportLocal, passportGoogle };
