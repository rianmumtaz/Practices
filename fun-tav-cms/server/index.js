const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cors = require("cors");

const connectToDB = require("./config/db");
connectToDB();

app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 5000;

app.use("/api/destination/", require("./routes/destination"));

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
