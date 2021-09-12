const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const flash = require("connect-flash");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");
const { passportLocal, passportGoogle } = require("./config/passport");

const app = express();

//setting folder yang dijadiin folder public
app.use(express.static("public"));

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//loading environment variables
dotenv.config({ path: "./config/.env" });

//connect to mongodb atlas
connectDB();

//Passport config
passportLocal(passport);
passportGoogle(passport);

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Method override
// override with POST having ?_method
app.use(methodOverride("_method"));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/donuts", require("./routes/donuts.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/pelamar", require("./routes/pelamar"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});
