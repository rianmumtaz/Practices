const express = require("express");
const router = express.Router();
const { loginStat } = require("../functions/login_register");
const Destination = require("../../model/Destination");
const Departure = require("../../model/Departure");
const CustomRequest = require("../../model/CustomRequest");
const Feedback = require("../../model/Feedback");
const {
  whenError,
  whenWarning,
  whenSuccess,
} = require("../functions/event_handler");

//destination manager page
router.get("/destination", loginStat, (req, res) => {
  res.render("body/admin/destination");
});

//destination manager query for searching and pagination
router.get("/destination/page", loginStat, async (req, res) => {
  let { name, domestic, showLimit, sortBtn, page } = req.query;
  let querySearch = {};

  if (name !== "") {
    querySearch["place.name"] = {
      $regex: name,
      $options: "i",
    };
  }
  if (domestic !== "") {
    if (domestic === "true") {
      querySearch["place.domestic"] = true;
    } else {
      querySearch["place.domestic"] = false;
    }
  }

  try {
    const datas = await Destination.find(querySearch).countDocuments();
    const nop = Math.ceil(datas / parseInt(showLimit));
    page = page || "0";
    const skip = parseInt(showLimit) * parseInt(page);

    Destination.find(querySearch)
      .sort({
        "place.name": parseInt(sortBtn),
      })
      .limit(parseInt(showLimit))
      .skip(skip)
      .then((destinations) => {
        res.render("body/admin/destination", {
          destinations,
          name,
          showLimit,
          sortBtn,
          nop,
          domestic,
          page,
        });
      })
      .catch((err) => {
        whenError(
          req,
          res,
          err,
          "/admin/destination",
          "Terjadi kesalahan pada sistem"
        );
      });
  } catch (err) {
    whenError(
      req,
      res,
      err,
      "/admin/destination",
      "Terjadi kesalahan pada sistem"
    );
  }
});

//departure manager page
router.get("/departure", loginStat, async (req, res) => {
  try {
    const destinations = await Destination.find().exec();
    res.render("body/admin/departure", { destinations });
  } catch (err) {
    whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
  }
});

//departure manager query for searching and pagination
router.get("/departure/page", loginStat, async (req, res) => {
  try {
    const destinations = await Destination.find().exec();
    let { title, destination, showLimit, sortBtn, page } = req.query;
    let querySearch = {};

    if (title !== "") {
      querySearch.title = {
        $regex: title,
        $options: "i",
      };
    }
    if (destination !== "") {
      querySearch.destination = destination;
    }

    const datas = await Departure.find(querySearch).countDocuments();
    const nop = Math.ceil(datas / parseInt(showLimit));
    page = page || "0";
    const skip = parseInt(showLimit) * parseInt(page);

    Departure.find(querySearch)
      .sort({
        title: parseInt(sortBtn),
      })
      .limit(parseInt(showLimit))
      .skip(skip)
      .then((departures) => {
        res.render("body/admin/departure", {
          destinations,
          title,
          showLimit,
          sortBtn,
          nop,
          destination,
          page,
          departures,
        });
      })
      .catch((err) => {
        whenError(
          req,
          res,
          err,
          "/admin/departure",
          "Terjadi kesalahan pada sistem"
        );
      });
  } catch (err) {
    whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
  }
});

//destination add submition
router.post("/destination/add", (req, res) => {
  Destination.findOne(
    {
      "place.name": {
        $regex: req.body.name,
        $options: "i",
      },
    },
    function (err, dest) {
      if (err) {
        whenError(
          req,
          res,
          err,
          "/admin/destination",
          "Terjadi kesalahan pada sistem"
        );
      } else {
        if (dest) {
          whenWarning(
            req,
            res,
            "",
            "/admin/destination",
            "Destination name already existed"
          );
        } else {
          const newDest = new Destination({
            place: {
              domestic: req.body.category === "domestic" ? true : false,
              name: req.body.name,
            },
          });

          newDest
            .save()
            .then(() => {
              whenSuccess(
                req,
                res,
                "",
                "/admin/destination",
                "Destinasi berhasil disimpan"
              );
            })
            .catch((err) => {
              whenError(
                req,
                res,
                err,
                "/admin/destination",
                "Destinasi gagal disimpan"
              );
            });
        }
      }
    }
  );
});

//departure add submition
router.post("/departure/add", (req, res) => {
  const adult_twin =
    req.body.adult_twin === "" || req.body.adult_twin === "Not available"
      ? "Not available"
      : "Rp " + req.body.adult_twin;
  const adult_single =
    req.body.adult_single === "" || req.body.adult_single === "Not available"
      ? "Not available"
      : "Rp " + req.body.adult_single;
  const kids_twin =
    req.body.kids_twin === "" || req.body.kids_twin === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_twin;
  const kids_extra =
    req.body.kids_extra === "" || req.body.kids_extra === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_extra;
  const kids_no_bed =
    req.body.kids_no_bed === "" || req.body.kids_no_bed === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_no_bed;
  const airport =
    req.body.airport === "" || req.body.airport === "Included"
      ? "Included"
      : "Rp " + req.body.airport;
  const visa =
    req.body.visa === "" || req.body.visa === "Not available"
      ? "Not available"
      : "Rp " + req.body.visa;
  const ppn =
    req.body.ppn === "" || req.body.ppn === "Included"
      ? "Included"
      : req.body.ppn;
  const total = (
    parseInt(
      req.body.adult_single === "" || req.body.adult_single === "Not available"
        ? 0
        : req.body.adult_single.replace(/\./g, "")
    ) +
    parseInt(
      req.body.airport === "" || req.body.airport === "Included"
        ? 0
        : req.body.airport.replace(/\./g, "")
    )
  ).toString();
  let newTotal = "";
  if (total.length > 9) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 9) +
      "." +
      total.substr(total.length - 9, 3) +
      "." +
      total.substr(total.length - 6, 3) +
      "." +
      total.substr(total.length - 3);
  } else if (total.length > 6) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 6) +
      "." +
      total.substr(total.length - 6, 3) +
      "." +
      total.substr(total.length - 3);
  } else if (total.length > 3) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 3) +
      "." +
      total.substr(total.length - 3);
  }
  const recommended = req.body.recommended ? true : false;
  const no_itineraries = parseInt(req.body.no_itineraries);
  let itinerary = [];
  for (let i = 1; i <= no_itineraries; i++) {
    itinerary.push({
      day: req.body[`day${i}`],
      title: req.body[`title${i}`],
      date: req.body[`date${i}`],
      description: req.body[`description${i}`],
      eat: {
        breakfast: req.body[`breakfast${i}`] ? true : false,
        lunch: req.body[`lunch${i}`] ? true : false,
        dinner: req.body[`dinner${i}`] ? true : false,
      },
    });
  }
  Departure.findOne(
    {
      title: {
        $regex: req.body.title,
        $options: "i",
      },
    },
    function (err, dep) {
      if (err) {
        whenError(
          req,
          res,
          err,
          "/admin/departure",
          "Terjadi kesalahan pada sistem"
        );
      } else {
        if (dep) {
          whenWarning(
            req,
            res,
            "",
            "/admin/departure",
            "Departure title already existed"
          );
        } else {
          const newDeparture = new Departure({
            title: req.body.title,
            price: {
              adult: {
                twin: adult_twin,
                single: adult_single,
              },
              kids: {
                twin: kids_twin,
                extra: kids_extra,
                no_bed: kids_no_bed,
              },
              other: {
                airport: airport,
                visa: visa,
                ppn: ppn,
              },
              total: newTotal,
            },
            itinerary: itinerary,
            availability: req.body.availability,
            recommended: recommended,
            destination: req.body.destination,
          });

          newDeparture
            .save()
            .then((data) => {
              Destination.findOneAndUpdate(
                {
                  _id: data.destination,
                },
                {
                  $push: {
                    departures: data._id,
                  },
                },
                {
                  new: true,
                },
                function (err) {
                  if (err) {
                    whenError(
                      req,
                      res,
                      err,
                      "/admin/departure",
                      "Departure: berhasil, Destinasi: gagal"
                    );
                  } else {
                    whenSuccess(
                      req,
                      res,
                      "",
                      "/admin/departure",
                      "Departure: berhasil, Destinasi: berhasil"
                    );
                  }
                }
              );
            })
            .catch((err) => {
              whenError(
                req,
                res,
                err,
                "/admin/departure",
                "Departure gagal disimpan"
              );
            });
        }
      }
    }
  );
});

//departure edit page
router.get("/departure/edit/:id", loginStat, async (req, res) => {
  try {
    const destinations = await Destination.find().exec();
    const departure = await Departure.findOne({ _id: req.params.id }).exec();
    let dateArr = [];

    departure.itinerary.forEach((element) => {
      const date = new Date(element.date);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      dateArr.push(year + "-" + month + "-" + dt);
    });
    res.render("body/admin/departure_edit", {
      destinations,
      departure,
      dateArr,
    });
  } catch (err) {
    whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
  }
});

//departure edit submition
router.put("/departure/edit/:id", (req, res) => {
  const adult_twin =
    req.body.adult_twin === "" || req.body.adult_twin === "Not available"
      ? "Not available"
      : "Rp " + req.body.adult_twin;
  const adult_single =
    req.body.adult_single === "" || req.body.adult_single === "Not available"
      ? "Not available"
      : "Rp " + req.body.adult_single;
  const kids_twin =
    req.body.kids_twin === "" || req.body.kids_twin === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_twin;
  const kids_extra =
    req.body.kids_extra === "" || req.body.kids_extra === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_extra;
  const kids_no_bed =
    req.body.kids_no_bed === "" || req.body.kids_no_bed === "Not available"
      ? "Not available"
      : "Rp " + req.body.kids_no_bed;
  const airport =
    req.body.airport === "" || req.body.airport === "Included"
      ? "Included"
      : "Rp " + req.body.airport;
  const visa =
    req.body.visa === "" || req.body.visa === "Not available"
      ? "Not available"
      : "Rp " + req.body.visa;
  const ppn =
    req.body.ppn === "" || req.body.ppn === "Included"
      ? "Included"
      : req.body.ppn;
  const total = (
    parseInt(
      req.body.adult_single === "" || req.body.adult_single === "Not available"
        ? 0
        : req.body.adult_single.replace(/\./g, "")
    ) +
    parseInt(
      req.body.airport === "" || req.body.airport === "Included"
        ? 0
        : req.body.airport.replace(/\./g, "")
    )
  ).toString();
  let newTotal = "";
  if (total.length > 9) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 9) +
      "." +
      total.substr(total.length - 9, 3) +
      "." +
      total.substr(total.length - 6, 3) +
      "." +
      total.substr(total.length - 3);
  } else if (total.length > 6) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 6) +
      "." +
      total.substr(total.length - 6, 3) +
      "." +
      total.substr(total.length - 3);
  } else if (total.length > 3) {
    newTotal =
      "Rp " +
      total.substr(0, total.length - 3) +
      "." +
      total.substr(total.length - 3);
  }
  const recommended = req.body.recommended ? true : false;
  const no_itineraries = parseInt(req.body.no_itineraries);
  let itinerary = [];
  for (let i = 1; i <= no_itineraries; i++) {
    itinerary.push({
      day: req.body[`day${i}`],
      title: req.body[`title${i}`],
      date: req.body[`date${i}`],
      description: req.body[`description${i}`],
      eat: {
        breakfast: req.body[`breakfast${i}`] ? true : false,
        lunch: req.body[`lunch${i}`] ? true : false,
        dinner: req.body[`dinner${i}`] ? true : false,
      },
    });
  }
  Departure.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      title: req.body.title,
      price: {
        adult: {
          twin: adult_twin,
          single: adult_single,
        },
        kids: {
          twin: kids_twin,
          extra: kids_extra,
          no_bed: kids_no_bed,
        },
        other: {
          airport: airport,
          visa: visa,
          ppn: ppn,
        },
        total: newTotal,
      },
      itinerary: itinerary,
      availability: req.body.availability,
      recommended: recommended,
      destination: req.body.destination,
    },
    { new: true, overwrite: true },
    function (err) {
      if (err) {
        whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
      } else {
        whenSuccess(
          req,
          res,
          "",
          "/admin/departure",
          "Departure: berhasil diupdate"
        );
      }
    }
  );
});

//destination edit page
router.get("/destination/edit/:id", loginStat, async (req, res) => {
  try {
    const destination = await Destination.findOne({
      _id: req.params.id,
    }).exec();

    res.render("body/admin/destination_edit", {
      destination,
    });
  } catch (err) {
    whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
  }
});

//destination edit submition
router.put("/destination/edit/:id", (req, res) => {
  Destination.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      place: {
        domestic: req.body.category === "domestic" ? true : false,
        name: req.body.name,
      },
    },
    { new: true, overwrite: true },
    function (err) {
      if (err) {
        whenError(req, res, err, "/", "Terjadi kesalahan pada sistem");
      } else {
        whenSuccess(
          req,
          res,
          "",
          "/admin/destination",
          "Destination: berhasil diupdate"
        );
      }
    }
  );
});

//destination delete
router.get("/destination/delete/:id", async (req, res) => {
  try {
    const departures = await Departure.deleteMany({
      destination: req.params.id,
    });
    const destination = await Destination.deleteOne({ _id: req.params.id });
    whenSuccess(
      req,
      res,
      {
        departuresDeletedCount: departures.deletedCount,
        destinationDeletedCount: destination.deletedCount,
      },
      "/admin/destination",
      "Berhasil hapus destinasi dan departure"
    );
  } catch (err) {
    whenError(req, res, err, "/", "Gagal delete destination");
  }
});

//departure delete
router.get("/departure/delete/:id", (req, res) => {
  Departure.findOne(
    {
      _id: req.params.id,
    },
    function (err, departure) {
      if (err) {
        whenError(req, res, err, "/", "Gagal mencari departure");
      } else {
        if (departure) {
          Destination.findOneAndUpdate(
            {
              _id: departure.destination,
            },
            {
              $pull: {
                departures: departure._id,
              },
            },
            {
              new: true,
            },
            async function (err) {
              if (err) {
                whenError(
                  req,
                  res,
                  err,
                  "/admin/departure",
                  "Gagal mengupdate destinasi"
                );
              } else {
                try {
                  const departure = await Departure.deleteOne({
                    _id: req.params.id,
                  });

                  whenSuccess(
                    req,
                    res,
                    departure,
                    "/admin/departure",
                    "Berhasil hapus departure dan update destinasi"
                  );
                } catch (err) {
                  whenError(req, res, err, "/", "Gagal menghapus departure");
                }
              }
            }
          );
        } else {
          whenWarning(req, res, "", "/", "Departure tidak ditemukan");
        }
      }
    }
  );
});

//custom request page
router.get("/custom_request", loginStat, (req, res) => {
  CustomRequest.find()
    .then((customRequests) => {
      res.render("body/admin/custom_request", { customRequests });
    })
    .catch((err) => {
      whenError(req, res, err, "/", "Gagal mencari custom request");
    });
});

//tanggapan page
router.get("/tanggapan", loginStat, (req, res) => {
  Feedback.find()
    .then((feedbacks) => {
      res.render("body/admin/tanggapan", { feedbacks });
    })
    .catch((err) => {
      whenError(req, res, err, "/", "Gagal mencari tanggapan");
    });
});

module.exports = router;
