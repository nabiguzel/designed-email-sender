
const express = require('express')
const path = require('path');
const { engine } = require('express-handlebars');
const { i18nInit, translate } = require("./config/i18n");

module.exports = (app) => {
    app.set('view engine', 'handlebars');

    app.engine('handlebars', engine({
        layoutsDir: __dirname + '/views/emails/layouts',
        extname: 'handlebars',
        defaultLayout: 'planB',
        partialsDir: __dirname + '/views/emails/partials/',
        helpers: {
            translate: translate,
            translateByHash: function (ttext, toptions) {
                return translate(ttext, toptions.hash);
            },
        }

    }));

    app.use(express.static('public'))

    app.get('/maildesign', async (req, res) => {
        res.render(
            path.resolve(__dirname + '/views/emails/publishmentAnnounce'),
            {
                layout: 'main',
                appLogoPath: 'assets/images/huawei_logo.png',
                socialLinkedIn: "https://www.linkedin.com/company/huawei",
                socialFaceBook: "https://www.facebook.com/Huawei",
                socialTwitter: "https://www.twitter.com/Huawei",
                socialYouTube: "https://www.youtube.com/Huawei",
                socialInstagram: "https://www.instagram.com/huawei/",
                webPagePath: "https://www.huawei.com/",
                webPageTitle: "Huawei",
                companyAddress: "Türkiye",

                subject: "New Version",
                appName: "Designed Mail Sender",
                verisonName: "Hero Version (1.2.0)",
                webPageName: "HUAWEI AppGallery",
                publishmentInformations: {
                    publisherName: "Nabi Güzel",
                    publisherEmail: "nabiguzel@gmail.com",
                    publisherPhoneNumber: "9005## ### ####",
                    publishmentNote: "Fixed some problems. Added some new feauters.",
                }
            }
        );
    });
}
