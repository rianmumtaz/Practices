const express = require("express");
const router = express.Router();
const { loginStat, getDataNasa } = require("./functions/eventHandler");
const NodeGeocoder = require("node-geocoder");

router.get("/", loginStat, (req, res) => {
  res.render("simulate/index", { layout: "layouts/simulate_layout" });
});

router.post("/search", loginStat, async (req, res) => {
  try {
    const options = {
      provider: "mapquest",

      // Optional depending on the providers
      // fetch: customFetchImplementation,
      apiKey: process.env.mapquest_apikey, // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
    };

    const geocoder = NodeGeocoder(options);
    const dataMap = await geocoder.geocode(req.body.searchMap);

    getDataNasa(
      res,
      dataMap[0].longitude.toFixed(2),
      dataMap[0].latitude.toFixed(2)
    );
  } catch (err) {
    console.error(err);
    req.flash("error", "Error. Cannot retrieve coordinates");
    res.redirect("/simulate");
  }
});

router.post("/api/nasa", loginStat, (req, res) => {
  if (req.body.lng !== "" && req.body.lat !== "") {
    getDataNasa(res, req.body.lng, req.body.lat);
  } else {
    req.flash(
      "warning",
      "Please make sure latitude and longitude are not empty"
    );
    res.redirect("/simulate");
  }
});

module.exports = router;
