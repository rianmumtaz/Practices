const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // default: false
  auth: {
    user: process.env.email,
    pass: process.env.pass_via_generated_appPasswords,
  },
});

module.exports = transporter;

/*this call only tests connection and authentication but it does not check if the service allows you to use a specific envelope From address or not.*/
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//     const transporterConn = false;
//     module.exports = { transporter, transporterConn };
//   } else {
//     const transporterConn = true;
//     module.exports = { transporter, transporterConn };
//   }
// });
