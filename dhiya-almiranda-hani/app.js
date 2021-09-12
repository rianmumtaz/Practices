const express = require("express");
const dotenv = require("dotenv");
const { connectDB, db } = require("./config/db");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

//use morgan logging if development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

//use body parser
app.use(express.urlencoded({ extended: true }));

//use public folder for asset
app.use(express.static("public"));

//use ejs as templating engine
app.set("view engine", "ejs");

//use layout
app.use(expressLayouts);

//setting layout
app.set("layout", "layouts/layout-main");

//load .env
dotenv.config({ path: "./config/.env" });

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//cookie parser for accessing req.cookies
app.use(cookieParser());

// Connect flash
app.use(flash());

//global vars for flash message
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  next();
});

//router middleware
app.use("/", require("./route/index"));

//connect to DB
connectDB();

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server Up and running at http://localhost:${PORT}`);
  });
});
