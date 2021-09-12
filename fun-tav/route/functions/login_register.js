const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { whenError, whenSuccess, whenWarning } = require("./event_handler");
const User = require("../../model/User");
const sendEmail = require("./send_email");

//sending email for account activation
const sendEmailActivation = (req, res, user) => {
  try {
    const payload = {
      email: user.email,
    };
    const accTok_activ = jwt.sign(payload, process.env.ats_activ, {
      expiresIn: process.env.ate_activ,
    });
    const refTok_activ = jwt.sign(payload, process.env.rts_activ, {
      expiresIn: process.env.rte_activ,
    });

    sendEmail(
      req,
      res,
      "FUNTAV: Account Activation",
      "",
      "<h3>Hi, thank you for signing up.</h3><p>Please activate your account by click this <a href='http://localhost:3000/user/activate?ref=" +
        refTok_activ +
        "&acc=" +
        accTok_activ +
        "'>link.</a></p>",
      "acc_activation"
    );
  } catch (err) {
    whenError(req, res, err, "/", "Terjadi kesalahan sistem, coba lagi nanti");
  }
};

//creating new user account
const createNewUser = (req, res, form) => {
  bcrypt.genSalt(parseInt(process.env.saltRounds), function (err, salt) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan sistem, coba lagi nanti"
      );
    } else {
      bcrypt.hash(form.password, salt, function (err, hash) {
        if (err) {
          whenError(
            req,
            res,
            err,
            "/",
            "Terjadi kesalahan sistem, coba lagi nanti"
          );
        } else {
          const newUser = new User({
            email: form.email,
            password: hash,
          });

          newUser
            .save()
            .then((data) => {
              sendEmailActivation(req, res, data);
            })
            .catch((err) => {
              whenError(
                req,
                res,
                err,
                "/",
                "Terjadi kesalahan sistem, coba lagi nanti"
              );
            });
        }
      });
    }
  });
};

//activation a new account by verificating the token sent to their email
const verifyActivation = (req, res, next) => {
  jwt.verify(req.query.acc, process.env.ats_activ, function (err, decoded) {
    if (err) {
      res.cookie("rt_act", req.query.ref, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      });
      whenWarning(
        req,
        res,
        err,
        "/user/reactivate",
        "Gagal mengaktivasi akun kamu. Silakan kirim ulang email aktivasi"
      );
    } else {
      req.user = decoded;
      next();
    }
  });
};

//creating new token if the older token is expired
const createNewToken = (req, res) => {
  jwt.verify(
    req.cookies.rt_act,
    process.env.rts_activ,
    function (err, decoded) {
      if (err) {
        whenError(
          req,
          res,
          err,
          "/",
          "Terjadi kesalahan sistem, coba lagi nanti"
        );
      } else {
        res.clearCookie("rt_act");
        req.body.email = decoded.email;
        sendEmailActivation(req, res, decoded);
      }
    }
  );
};

//login and sign a token
const login = (req, res, user) => {
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan sistem, coba lagi nanti"
      );
    } else {
      if (result) {
        try {
          const payload = {
            email: user.email,
            role: user.role,
          };
          const accTok_login = jwt.sign(payload, process.env.ats_login, {
            expiresIn: process.env.ate_login,
          });
          const refTok_login = jwt.sign(payload, process.env.rts_login, {
            expiresIn: process.env.rte_login,
          });
          res.cookie("at_log", accTok_login, {
            secure: true,
            httpOnly: true,
            sameSite: "lax",
          });
          res.cookie("rt_log", refTok_login, {
            secure: true,
            httpOnly: true,
            sameSite: "lax",
          });
          whenSuccess(req, res, "", "/", "Logged in");
        } catch (err) {
          whenError(
            req,
            res,
            err,
            "/user/masuk",
            "Terjadi kesalahan pada sistem, coba lagi nanti"
          );
        }
      } else {
        whenWarning(
          req,
          res,
          "",
          "/user/masuk",
          "Password yang Anda masukan salah"
        );
      }
    }
  });
};

//verifiy user
const verifyLogin = (req, res, next) => {
  jwt.verify(
    req.cookies.at_log,
    process.env.ats_login,
    function (err, decoded) {
      if (err) {
        res.locals.isLoggedIn = false;
        res.locals.role = "member";
        next();
      } else {
        res.locals.isLoggedIn = true;
        res.locals.role = decoded.role;
        res.redirect("/");
      }
    }
  );
};

//verify login status
const loginStat = (req, res, next) => {
  jwt.verify(
    req.cookies.at_log,
    process.env.ats_login,
    function (err, decoded) {
      if (err) {
        res.locals.isLoggedIn = false;
        res.locals.role = "member";
        next();
      } else {
        res.locals.isLoggedIn = true;
        res.locals.role = decoded.role;
        next();
      }
    }
  );
};

//verify login
const verifyLoginMember = (req, res, next) => {
  jwt.verify(
    req.cookies.at_log,
    process.env.ats_login,
    function (err, decoded) {
      if (err) {
        res.locals.isLoggedIn = false;
        res.locals.role = "member";
        req.flash("warning", "Silakan masuk ke akun anda terlebih dahulu");
        res.redirect("/user/masuk");
      } else {
        res.locals.isLoggedIn = true;
        res.locals.role = decoded.role;
        res.locals.user = decode;
        next();
      }
    }
  );
};

module.exports = {
  createNewUser,
  verifyActivation,
  createNewToken,
  login,
  verifyLogin,
  loginStat,
  sendEmailActivation,
  verifyLoginMember,
};
