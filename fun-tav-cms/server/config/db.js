const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", function (err) {
    console.error("mongo db connection error: ", err);
  });
  db.once("open", function () {
    console.log("DB connected");
  });
};

module.exports = connectToDB;
