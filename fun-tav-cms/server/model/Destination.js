const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Destination",
  new mongoose.Schema(
    {
      place: {
        domestic: {
          type: Boolean,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      departures: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Departure",
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
