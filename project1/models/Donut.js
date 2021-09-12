const mongoose = require("mongoose");
const path = require("path");

const imagePath = "uploads/donutImages/";

const DonutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//ini untuk dapetin path dari imageName soalnya bakal di ditampilin di img src index.ejs nya books
DonutSchema.virtual("coverImagePath").get(function () {
  if (this.imageName != null) {
    return path.join("/", imagePath, this.imageName);
  }
});

module.exports = mongoose.model("Donut", DonutSchema);
module.exports.imagePath = imagePath;
