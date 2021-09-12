const express = require("express");
const router = express.Router();
const CustomRequest = require("../model/CustomRequest");
const { whenSuccess, whenError } = require("./functions/event_handler");

router.post("/custom/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const sender = req.body.title + " " + req.body.name;
  new CustomRequest({
    sender,
    email: req.body.email,
    budget: req.body.budget,
    transportation: req.body.transportation,
    hotel: req.body.hotel,
    food: req.body.food,
    schedule: req.body.schedule,
    culinary: req.body.culinary,
    people: req.body.people,
    medical: req.body.medical,
    departure: req.params.id,
  })
    .save()
    .then(() => {
      whenSuccess(
        req,
        res,
        "",
        `/liburan/departure/${req.params.id}`,
        "Request anda sudah terkirim. Kami akan menghubungin Anda untuk menawarkan keberangkatan yang sesuai"
      );
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
