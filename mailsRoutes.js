const express = require('express');
const router = express.Router();
const mailSender = require('./config/mailSender');

router.post("/announce_publishment", async (req, res) => {
    const translate = req.__;
    try {
        const { publisherName, publisherEmail, publisherPhoneNumber, publishmentNote } = req.body;

        if (!publisherName || !publisherEmail || !publisherPhoneNumber || !publishmentNote)
            return res.status(400).json({
                message: "Missing required fields error",
                errors: [!publisherName && "publisherName", !publisherEmail && "publisherEmail", !publisherPhoneNumber && "publisherPhoneNumber", !publishmentNote && "publishmentNote"]
                    .filter(a => !!a)
                    .map(attr => ({
                        "message": `Required '${attr}' field is missing`
                    }))
            });

        const mailOptions = {
            to: 'info@myapp.com',
            from: `MailSender <info@mailsender.com>`,
            subject: "New Version",
            template: 'publishmentAnnounce',
            context: {
                subject: 'New Version Announcment',
                appName: "Designed Mail Sender",
                verisonName: "Hero Version (1.2.0)",
                webPageName: "HUAWEI AppGallery",
                publishmentInformations: {
                    publisherName: publisherName,
                    publisherEmail: publisherEmail,
                    publisherPhoneNumber: publisherPhoneNumber,
                    publishmentNote: publishmentNote,
                }

            }
        };

        const result = await mailSender(mailOptions);

        if (!result) {
            return res.status(400).json({
                message: translate("Sending %s failed.", translate("Version Announcment"))
            });
        }

        return res.status(200).json({
            status: 200,
            message: translate("%s successfully sent.", translate("Version Announcment"))
        });
    } catch (error) {
        console.error({ error });
        res.status(400).json({
            message: translate("Sending %s failed.", translate("Version Announcment"))
        });
    }
})

router.post("/forgot_password", async (req, res) => {
    const translate = req.__;
    try {
        const { email } = req.body;

        if (!email)
            return res.status(400).json({
                message: "Missing required fields error",
                errors: [!email && "email"]
                    .filter(a => !!a)
                    .map(attr => ({
                        "message": `Required '${attr}' field is missing`
                    }))
            });

        const userName = "Name from database";
        const verifyToken = "Generate a token as a temp password.";

        const mailOptions = {
            to: 'email',
            from: `MailSender <info@mailsender.com>`,
            subject: "Forgot Password",
            template: 'forgotPassword',
            context: {
                subject: 'Forgot Password',
                userName: userName,
                appName: "mailsender",
                hostName: "http://mailsender.com", //req.headers.host
                verifyToken: verifyToken,
            }
        };

        const result = await mailSender(mailOptions);

        if (!result) {
            return res.status(400).json({
                message: translate("Sending %s failed.", translate("Forgot Password"))
            });
        }

        return res.status(200).json({
            status: 200,
            message: translate("%s successfully sent.", translate("Forgot Password"))
        });
    } catch (error) {
        console.error({ error });
        res.status(400).json({
            message: translate("Sending %s failed.", translate("Forgot Password"))
        });
    }
})

router.post("/password_changed", async (req, res) => {
    const translate = req.__;
    try {
        const { userName } = req.body;

        if (!userName)
            return res.status(400).json({
                message: "Missing required fields error",
                errors: [!userName && "userName"]
                    .filter(a => !!a)
                    .map(attr => ({
                        "message": `Required '${attr}' field is missing`
                    }))
            });

        const mailOptions = {
            to: 'email',
            from: `MailSender <info@mailsender.com>`,
            subject: "Password Changed Warning",
            template: 'forgotPassword',
            context: {
                subject: 'Password Changed Warning',
                userName: userName,
                appName: "mailsender",
                webContactFormPath:"http://mymailsenderapp.com/contact"
            }
        };

        const result = await mailSender(mailOptions);

        if (!result) {
            return res.status(400).json({
                message: translate("Sending %s failed.", translate("Password Changed Warning"))
            });
        }

        return res.status(200).json({
            status: 200,
            message: translate("%s successfully sent.", translate("Password Changed Warning"))
        });
    } catch (error) {
        console.error({ error });
        res.status(400).json({
            message: translate("Sending %s failed.", translate("Password Changed Warning"))
        });
    }
})

module.exports = router;
