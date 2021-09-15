const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config/.env" });

const { connectFunc, db } = require("./config/db");

//because interaction between front and back via axios, then only need json to parse json. in this case we dont need body parser urlencoded becos theres no html form to be parsed.
app.use(express.json());

app.use("/api/mc/", require("./route/mc"));
app.use("/api/agenda/", require("./route/agenda"));

connectFunc();

db.once("open", () => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`server up and running at http://localhost:${PORT}`);
  });
});
