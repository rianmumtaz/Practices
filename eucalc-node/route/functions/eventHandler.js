const User = require("../../model/User");
const bcrypt = require("bcrypt");
const Question = require("../../model/Question");
const transporter = require("../../config/transporter");
const jwt = require("jsonwebtoken");
const axios = require("axios");

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

const createQuestion = (req, res) => {
  const newQuestion = new Question(req.body);
  newQuestion
    .save()
    .then((data) => {
      whenSuccess(
        req,
        res,
        data,
        "/",
        "Thank you. I will get back to you soon..."
      );
    })
    .catch((err) => {
      whenError(
        req,
        res,
        err,
        "/",
        "Something went wrong. We'll fix this soon..."
      );
    });
};

const sendEmail = (req, res, subject, text, html, question) => {
  const message = {
    from: process.env.email,
    to: req.body.email,
    subject,
    text,
    html,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Something went wrong. We'll fix this soon..."
      );
    } else {
      if (question) {
        createQuestion(req, res);
      } else {
        whenSuccess(
          req,
          res,
          "",
          "/login",
          "Thank you. Check your email to activate your account"
        );
      }
    }
  });
};

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
      "EUCALC: Account Activation",
      "",
      "<h3>Hi, thank you for signing up.</h3><p>Please activate your account by click this <a href='http://localhost:3000/activate?ref=" +
        refTok_activ +
        "&acc=" +
        accTok_activ +
        "'>link.</a></p>",
      false
    );
  } catch (err) {
    whenError(
      req,
      res,
      err,
      "/",
      "Something went wrong. We'll fix this soon..."
    );
  }
};

const createNewUser = (req, res, form) => {
  bcrypt.genSalt(parseInt(process.env.saltRounds), function (err, salt) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Something went wrong. We'll fix this soon..."
      );
    } else {
      bcrypt.hash(form.password, salt, function (err, hash) {
        if (err) {
          whenError(
            req,
            res,
            err,
            "/",
            "Something went wrong. We'll fix this soon..."
          );
        } else {
          const newUser = new User({
            name: form.name,
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
                "Something went wrong. We'll fix this soon..."
              );
            });
        }
      });
    }
  });
};

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
        "/reactivate",
        "Cannot activate your account. Try resending the activation email"
      );
    } else {
      req.user = decoded;
      next();
    }
  });
};

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
          "Something went wrong. We'll fix this soon..."
        );
      } else {
        res.clearCookie("rt_act");
        req.body.email = decoded.email;
        sendEmailActivation(req, res, decoded);
      }
    }
  );
};

const login = (req, res, user) => {
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Something went wrong. We'll fix this soon..."
      );
    } else {
      if (result) {
        const payload = {
          email: user.email,
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
      } else {
        whenWarning(req, res, "", "/login", "Password is incorrect");
      }
    }
  });
};

const verifyLogin = (req, res, next) => {
  jwt.verify(
    req.cookies.at_log,
    process.env.ats_login,
    function (err, decoded) {
      if (err) {
        res.locals.isLoggedIn = false;
        whenWarning(
          req,
          res,
          err,
          "/",
          "You are not authorized to access this page."
        );
      } else {
        res.locals.isLoggedIn = true;
        next();
      }
    }
  );
};

const loginStat = (req, res, next) => {
  jwt.verify(
    req.cookies.at_log,
    process.env.ats_login,
    function (err, decoded) {
      if (err) {
        res.locals.isLoggedIn = false;
        next();
      } else {
        res.locals.isLoggedIn = true;
        next();
      }
    }
  );
};

const getDataNasa = (res, lng, lat) => {
  axios
    .get(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=WS2M,ALLSKY_SFC_SW_DWN,ALLSKY_KT,T2M,QV2M,ALLSKY_SRF_ALB&community=RE&longitude=${lng}&latitude=${lat}&format=JSON&start=2019&end=2019`
    )
    .then(function (response) {
      // handle success
      const Ta = Object.values(response.data.properties.parameter.T2M).slice(
        0,
        12
      );
      const Tin = Object.values(response.data.properties.parameter.T2M)[12];
      const H = Object.values(
        response.data.properties.parameter.ALLSKY_SFC_SW_DWN
      ).slice(0, 12);
      const KT = Object.values(
        response.data.properties.parameter.ALLSKY_KT
      ).slice(0, 12);
      const w = Object.values(response.data.properties.parameter.WS2M).slice(
        0,
        12
      );
      const q = Object.values(response.data.properties.parameter.QV2M).slice(
        0,
        12
      );
      const rhog = Object.values(
        response.data.properties.parameter.ALLSKY_SRF_ALB
      ).slice(0, 12);
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      res.render("simulate/index", {
        layout: "layouts/simulate_layout",
        Ta,
        Tin,
        H,
        lat,
        lng,
        month,
        w,
        KT,
        q,
        rhog,
      });
    })
    .catch(function (err) {
      console.error(err);
      req.flash("error", "Error. Cannot retrieve meteorological data");
      res.redirect("/simulate");
    });
};

module.exports = {
  whenError,
  whenSuccess,
  whenWarning,
  createNewUser,
  sendEmail,
  verifyActivation,
  createNewToken,
  login,
  verifyLogin,
  loginStat,
  getDataNasa,
};
