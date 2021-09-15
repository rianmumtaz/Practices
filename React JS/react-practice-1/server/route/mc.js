const express = require("express");
const router = express.Router();
const Mc = require("../model/Mc");

router.get("/", (req, res) => {
  Mc.find()
    .then((mcs) => {
      res.send(mcs);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  Mc.findOne({ name: req.body.name }, function (err, mc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (mc) {
        res.send(mc);
      } else {
        const newMc = new Mc(req.body);
        newMc
          .save()
          .then((data) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    }
  });
});

module.exports = router;
