const nodemailer = require("nodemailer");
const { whenError, whenSuccess } = require("./event_handler");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // default: false
  auth: {
    user: process.env.email,
    pass: process.env.pass_via_generated_appPasswords,
  },
});

const sendEmail = (req, res, subject, text, html, event) => {
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
        "Terjadi kesalahan sistem, coba lagi nanti"
      );
    } else {
      switch (event) {
        case "acc_activation":
          whenSuccess(
            req,
            res,
            "",
            "/",
            "Terima kasih. Email aktivasi sudah dikirimkan ke email Anda"
          );
          break;

        default:
          break;
      }
    }
  });
};

module.exports = sendEmail;
