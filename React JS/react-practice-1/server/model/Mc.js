const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Mc",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      agendas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agenda",
        },
      ],
    },
    { timestamps: true }
  )
);
