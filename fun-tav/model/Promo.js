const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Promo",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      expired: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
