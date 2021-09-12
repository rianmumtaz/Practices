const express = require("express");
const router = express.Router();
const Destination = require("../model/Destination");
const Departure = require("../model/Departure");
const Newsletter = require("../model/Newsletter");
const {
  whenError,
  whenSuccess,
  whenWarning,
} = require("./functions/event_handler");
const { loginStat } = require("./functions/login_register");

//home page
router.get("/", loginStat, async (req, res) => {
  try {
    const destination_datas = await Destination.countDocuments().exec();
    const destinations = await Destination.find()
      .limit(destination_datas > 4 ? 4 : "")
      .exec();
    const departure_datas = await Departure.find({ recommended: true })
      .countDocuments()
      .exec();
    const departures = await Departure.find({ recommended: true })
      .limit(departure_datas > 4 ? 4 : "")
      .exec();
    res.render("body/home", {
      destinations,
      destination_datas,
      departures,
      departure_datas,
    });
  } catch (err) {
    console.error(err);
    res.render("body/home");
  }
});

//singing up for newsletter
router.post("/newsletter", (req, res) => {
  //check if email already existed first then save new email to DB if there's none
  Newsletter.findOne(req.body, function (err, email) {
    if (err) {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan sistem, coba lagi nanti"
      );
    } else {
      if (email) {
        whenWarning(req, res, email, "/", "Email ini sudah berlangganan");
      } else {
        new Newsletter(req.body)
          .save()
          .then((data) => {
            whenSuccess(
              req,
              res,
              data,
              "/",
              "Terima kasih sudah berlangganan newsletter kami"
            );
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
    }
  });
});

module.exports = router;
