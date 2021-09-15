const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Agenda",
  new mongoose.Schema({
    agendaName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    noGuest: {
      type: String,
      required: true,
    },
    mc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mc",
      required: true,
    },
    mcName: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
  })
);
