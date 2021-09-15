const express = require("express");
const router = express.Router();
const Agenda = require("../model/Agenda");
const Mc = require("../model/Mc");

router.get("/", (req, res) => {
  Agenda.find()
    .then((agenda) => {
      res.send(agenda);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  Agenda.findOne(
    { date: req.body.date, time: req.body.time, mc: req.body.mc },
    function (err, agenda) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        if (agenda) {
          res.send({ new: false, existedAgenda: agenda });
        } else {
          const newAgenda = new Agenda(req.body);
          newAgenda
            .save()
            .then((data) => {
              Mc.findOneAndUpdate(
                { _id: data.mc },
                { $push: { agendas: data._id } },
                { new: true },
                function (err, mc) {
                  if (err) {
                    console.error(err);
                    res.sendStatus(500);
                  } else {
                    res.send({ new: true, newAgenda: data, updMc: mc });
                  }
                }
              );
              // res.sendStatus(200);
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      }
    }
  );
});

module.exports = router;
