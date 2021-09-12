const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//set .env file to include in process.env
const dotenv = require("dotenv");
dotenv.config();

//set connection to mongo db
const { connectToDB, db } = require("./config/db");
connectToDB();

db.on("error", (err) => {
  console.error("mongo db connection error:", err);
});
db.once("open", function () {
  // set public folder where image and other assets can defaultly be found
  app.use(express.static("./public"));

  //set templating engine to ejs
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.set("layout", "layouts/main");

  //to be able to get value from req.body
  app.use(express.urlencoded({ extended: true }));

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
    //req.flash is array. then, res.locals will be an empty array if theres no calling req.flash
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");

    next();
  });

  //set route
  app.use("/", require("./route/home"));
  app.use("/simulate", require("./route/simulate"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server up and running at http://localhost:3000/`);
  });
});
