const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Pelamar = require("../models/Pelamar");

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("pelamar/home");
});

router.get("/page", ensureAuthenticated, async (req, res) => {
  let { inputSearch, dateBefore, dateAfter, sortBtn, showLimit, page } =
    req.query;
  let querySearch = {};
  if (inputSearch != undefined && inputSearch != "") {
    querySearch.name = {
      $regex: inputSearch,
      $options: "i",
    };
  }
  if (
    dateBefore != undefined &&
    dateBefore != "" &&
    dateAfter != undefined &&
    dateAfter != ""
  ) {
    querySearch.dob = {
      $gte: dateBefore,
      $lte: dateAfter,
    };
  } else if (dateAfter != undefined && dateAfter != "") {
    querySearch.dob = {
      $lte: dateAfter,
    };
  } else if (dateBefore != undefined && dateBefore != "") {
    querySearch.dob = {
      $gte: dateBefore,
    };
  }
  const datas = await Pelamar.find(querySearch).countDocuments();
  const nop = Math.ceil(datas / showLimit);
  page = page || "0";
  const skip = parseInt(showLimit) * parseInt(page);
  Pelamar.find(querySearch)
    .sort({
      name: parseInt(sortBtn),
    })
    .limit(parseInt(showLimit))
    .skip(skip)
    .then((pelamars) => {
      if (pelamars.length > 0) {
        res.render("pelamar/home", {
          pelamars,
          inputSearch,
          dateBefore,
          dateAfter,
          sortBtn,
          showLimit,
          nop,
          page,
        });
      } else {
        req.flash("error_msg", `Data is not found`);
        res.redirect("/pelamar");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Something went wrong, failed to search pelamar");
      res.redirect("/pelamar");
      console.error(err);
    });
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("pelamar/add");
});

router.post("/add", (req, res) => {
  Pelamar.findOne({
    name: req.body.name,
  })
    .then((pelamar) => {
      if (!pelamar) {
        //buat baru
        new Pelamar(req.body)
          .save()
          .then((pelamar) => {
            req.flash("success_msg", "New pelamar has been saved successfully");
            res.redirect("/pelamar");
          })
          .catch((err) => {
            req.flash(
              "error_msg",
              "Something went wrong, cannot add new pelamar"
            );
            res.redirect("/pelamar");
            console.error(err);
          });
      } else {
        req.flash(
          "success_msg",
          `Pelamar with the name of ${pelamar.name} has been registered`
        );
        res.redirect("/pelamar");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Something went wrong, cannot add new pelamar");
      res.redirect("/pelamar");
      console.error(err);
    });
});

module.exports = router;
