const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      isActivated: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestamps: true }
  )
);
