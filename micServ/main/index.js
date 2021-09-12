const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//set public folder
app.use(express.static("public"));

//logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

// Express body parser
app.use(express.urlencoded({ extended: true }));

//route middleware
app.use("/", require("./route/user"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
