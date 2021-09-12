const express = require("express");
const axios = require("axios");

const route = express.Router();

route.get("/", (req, res) => {
  res.render("login");
});

route.get("/register", (req, res) => {
  res.render("register");
});

route.post("/register", (req, res) => {
  axios({
    method: "get",
    url: "http://localhost:4000/api/register",
    params: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });
  // axios
  //   .get("http://localhost:4000/api/register", {
  //     params: {
  //       firstName: "Fred",
  //       lastName: "Flintstone",
  //     },
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // axios
  //   .get(
  //     "http://localhost:4000/api/register?email=" +
  //       req.body.email +
  //       "&password=" +
  //       req.body.password +
  //       "&name=" +
  //       req.body.name
  //   )
  //   .then(function (response) {
  //     // handle success
  //     console.log(response.data);
  //     res.redirect("/register");
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
});

module.exports = route;
