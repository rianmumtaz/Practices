const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Pelamar",
  new mongoose.Schema(
    {
      name: String,
      dob: Date,
    },
    { timestamps: true }
  )
);
