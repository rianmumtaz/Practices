const express = require("express");
const app = express();

//setting up env variable file
const dotenv = require("dotenv");
dotenv.config({
  path: "./config/.env",
});

//setting up for logging and debugging
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Method override
// override with POST having ?_method
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//connecting to mongoDB Atlas
const connectToDB = require("./config/db");
connectToDB();

//set public folder where assets can be found
app.use(express.static("./public"));

//set templating engine to ejs
const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");

//setting up body-parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Express session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//cookie parser for accessing req.cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Connect flash
const flash = require("connect-flash");
app.use(flash());

//global vars for flash message
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");

  next();
});

//set route
app.use("/", require("./route/home"));
app.use("/user", require("./route/user"));
app.use("/page", require("./route/page"));
app.use("/liburan", require("./route/liburan"));
app.use("/admin", require("./route/admin/admin"));
app.use("/order", require("./route/order"));

PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server running at port: ${PORT}`);
});
