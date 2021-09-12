const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
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
      default: false,
    },
    role: {
      type: String,
      default: "member",
    },
    promo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promo",
      },
    ],
  })
);
