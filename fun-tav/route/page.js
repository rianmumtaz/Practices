const express = require("express");
const router = express.Router();
const { loginStat } = require("./functions/login_register");
const Feedback = require("../model/Feedback");
const { whenError, whenSuccess } = require("./functions/event_handler");
const Departure = require("../model/Departure");

//tentang kami page
router.get("/tentang_kami", loginStat, (req, res) => {
  res.render("body/tentang_kami");
});

//syarat ketentuan page
router.get("/syarat_ketentuan", loginStat, (req, res) => {
  res.render("body/syarat_ketentuan");
});

//kebijakan privasi page
router.get("/kebijakan_privasi", loginStat, (req, res) => {
  res.render("body/kebijakan_privasi");
});

//kebijakan privasi page
router.get("/faq", loginStat, (req, res) => {
  res.render("body/faq");
});

//tanggapan page
router.get("/tanggapan", loginStat, (req, res) => {
  res.render("body/tanggapan");
});

//submit tanggapan
router.post("/tanggapan", loginStat, (req, res) => {
  const newFeedback = new Feedback({
    name: req.body.title + " " + req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  newFeedback
    .save()
    .then(() => {
      whenSuccess(
        req,
        res,
        "",
        "/page/tanggapan",
        "Terima kasih, tanggapan anda sudah terkirim"
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

//rekomendasi Page
router.get("/rekomendasi", loginStat, async (req, res) => {
  try {
    const departures = await Departure.find({ recommended: true }).exec();

    res.render("body/rekomendasi", {
      departures,
    });
  } catch (err) {
    whenError(
      req,
      res,
      err,
      "/",
      "Terjadi kesalahan pada sistem, coba lagi nanti"
    );
  }
});

module.exports = router;
