const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');

const { translate } = require("./i18n");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  // port: 587,
  // secure: false, // true for 465, false for other ports
  pool: true,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname + '../../views/emails/partials'),
    // layoutsDir: path.join(__dirname, '../views/emails/layouts'),
    // defaultLayout: 'main.hbs',
    defaultLayout: 'views/emails/layouts/main',
    helpers: {
      translate: translate,
      translateByHash: function (ttext, toptions) {
        return translate(ttext, toptions.hash);
      },
    }
  },
  viewPath: path.resolve(__dirname + '../../views/emails'),
  extName: ".handlebars",
}));

const sendMail = (mailOptions) => {
  if (!mailOptions.from)
    mailOptions.from = 'Designed Mail Sender <info@mycompany.com>';

  return transporter.sendMail(mailOptions);
}


module.exports = sendMail;