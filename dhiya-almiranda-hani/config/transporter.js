const nodemailer = require("nodemailer");
const handler = require("../helper/handler");

module.exports = function sendMail(req, res, recipient, subject, text, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // default: false
    auth: {
      user: process.env.email,
      pass: process.env.pass_via_generated_appPasswords,
    },
  });

  // verify connection configuration
  transporter.verify(function (err, success) {
    if (err) {
      handler(
        "error",
        "Error! Something went wrong. Do it again later.",
        "/",
        req,
        res,
        err
      );
    } else {
      const message = {
        from: "untuktesdemo@gmail.com",
        to: recipient,
        subject: subject,
        text: text,
        html: html,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          //bisa karna bukan format email yang benar
          handler(
            "error",
            "Error! Something went wrong. Do it again later.",
            "/",
            req,
            res,
            err
          );
        } else {
          if (subject === "RELEARN: Activation") {
            handler(
              "warning",
              "This email has been registered but not activated yet. Activation email has been sent.",
              "/",
              req,
              res
            );
          } else {
            handler(
              "success",
              "Success! Thank you for subscribing to our newsletter",
              "/",
              req,
              res,
              "",
              info
            );
          }
        }
      });
    }
  });
};
