const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { connectToDB, db } = require("./config/db");
connectToDB();

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // for communication via axios (json)
  app.use(express.json());

  app.use("/", require("./route/question"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server up and running at port: ${PORT}`);
  });
});
