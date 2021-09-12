const express = require("express");
const router = express.Router();
const { loginStat } = require("./functions/login_register");
const Destination = require("../model/Destination");
const Departure = require("../model/Departure");
const { whenError, whenWarning } = require("./functions/event_handler");

//semua paket liburan page
router.get("/", loginStat, (req, res) => {
  Destination.find()
    .then((destinations) => {
      res.render("body/semua_paket", {
        destinations,
      });
    })
    .catch((err) => {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan pada sistem, coba lagi nanti"
      );
    });
});

//destination page
router.get("/destination/:id", loginStat, (req, res) => {
  Destination.findOne({ _id: req.params.id })
    .then((destination) => {
      if (destination) {
        Departure.find({ destination: req.params.id })
          .then((departures) => {
            res.render("body/destinasi", {
              destination,
              departures,
            });
          })
          .catch((err) => {
            whenError(
              req,
              res,
              err,
              "/",
              "Terjadi kesalahan pada sistem, coba lagi nanti"
            );
          });
      } else {
        whenWarning(
          req,
          res,
          "",
          "/",
          "Destinasi yang anda inginkan tidak tersedia"
        );
      }
    })
    .catch((err) => {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan pada sistem, coba lagi nanti"
      );
    });
});

router.get("/departure/:id", loginStat, (req, res) => {
  Departure.findOne({ _id: req.params.id })
    .then((departure) => {
      if (departure) {
        Destination.findOne({ _id: departure.destination })
          .then((destination) => {
            res.render("body/departure", {
              departure,
              destination,
            });
          })
          .catch((err) => {
            whenError(
              req,
              res,
              err,
              "/",
              "Terjadi kesalahan pada sistem, coba lagi nanti"
            );
          });
      } else {
        whenWarning(
          req,
          res,
          "",
          "/",
          "Keberangkatan yang anda inginkan tidak tersedia"
        );
      }
    })
    .catch((err) => {
      whenError(
        req,
        res,
        err,
        "/",
        "Terjadi kesalahan pada sistem, coba lagi nanti"
      );
    });
});

module.exports = router;
