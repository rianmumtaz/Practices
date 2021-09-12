const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Question",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      replied: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestamps: true }
  )
);
