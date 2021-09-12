const mongoose = require("mongoose");

module.exports = mongoose.model(
  "CustomRequest",
  new mongoose.Schema(
    {
      sender: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      budget: String,
      transportation: String,
      hotel: String,
      food: String,
      schedule: String,
      culinary: String,
      people: String,
      medical: String,
      departure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departure",
        required: true,
      },
    },
    { timestamps: true }
  )
);
