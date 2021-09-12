const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
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
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        default: "visitor",
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
