const express = require("express");
const router = express.Router();
const transporter = require("../config/transporter");
const Question = require("../model/Question");

router.post("/contactme", async (req, res) => {
  console.log(req.body);
  const message = {
    from: process.env.email,
    to: req.body.email,
    subject: "Eucalc Message",
    text: "",
    html: "<h1>Thank you. I will contact you soon.</h1>",
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const newQuestion = new Question(req.body);
      newQuestion
        .save()
        .then(() => {
          res.send(info);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  });
});

module.exports = router;
