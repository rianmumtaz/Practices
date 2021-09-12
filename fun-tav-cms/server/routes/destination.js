const express = require("express");
const router = express.Router();
const Destination = require("../model/Destination");

router.get("/", async (req, res) => {
  try {
    const { name, domestic, sort, limit } = req.query;
    let querySearch = {};
    if (name !== "") {
      querySearch["place.name"] = {
        $regex: name,
        $options: "i",
      };
    }
    if (domestic !== "") {
      if (domestic === "domestic") {
        querySearch["place.domestic"] = true;
      } else if (domestic === "nondomestic") {
        querySearch["place.domestic"] = false;
      }
    }

    const size = await Destination.find(querySearch).countDocuments();

    Destination.find(querySearch)
      .sort({
        "place.name": parseInt(sort),
      })
      .limit(parseInt(limit))
      .then((destinations) => {
        res.send({ destinations, size });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
