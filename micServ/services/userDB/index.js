const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const app = express();

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
    },
    { strict: false }
  )
);

app.get("/api/register", (req, res) => {
  console.log(req);
  // const newUser = new User(req.query);
  // newUser
  //   .save()
  //   .then((user) => {
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(4000, () => {
    console.log("server up and connected to DB");
  });
});
