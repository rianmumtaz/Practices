const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Newsletter",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
