const nodemailer = require("nodemailer");
const keys = require("./keys");
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: keys.smtp.user,
    pass: keys.smtp.pass,
  },
});
module.exports = transport;
