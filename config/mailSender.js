const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');

const { translate } = require("./i18n");

// create reusable transporter object using the default SMTP transport

const mailConfig = {
  host: process.env.MAIL_HOST,
  port: 587,
  pool: true,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(mailConfig);
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

  mailOptions.context = {
    appLogoPath: 'assets/images/huawei_logo.png',
    socialLinkedIn: "https://www.linkedin.com/company/huawei",
    socialFaceBook: "https://www.facebook.com/Huawei",
    socialTwitter: "https://www.twitter.com/Huawei",
    socialYouTube: "https://www.youtube.com/Huawei",
    socialInstagram: "https://www.instagram.com/huawei/",
    webPagePath: "https://www.huawei.com/",
    webPageTitle: "Huawei",
    companyAddress: "Türkiye",
    ...mailOptions.context
  }
  return transporter.sendMail(mailOptions);
}


module.exports = sendMail;