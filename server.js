const express = require('express')
const dotenv = require('dotenv').config()
const { i18nInit, translate } = require("./config/i18n");
const mailSender = require('./config/mailSender')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(i18nInit);

app.use("/hey", (req, res) => res.send(translate("greeting")))

app.post("/contact", async (req, res) => {
    const translate = req.__;
    try {
        const { name, email, phoneNumber, subject, message } = req.body;

        if (!name || !email || !subject || !message)
            return res.status(400).json({
                message: "Missing required fields error",
                errors: [!name && "Name", !email && "email", !subject && "Subject", !message && "Message"]
                .filter(a=>!!a)
                .map(attr => ({
                    "message": `Required '${attr}' field is missing`
                }))
            });

        const mailOptions = {
            to: 'info@myapp.com',
            from: `${name} <${email}>`,
            subject: "Contact Form" + ' - ' + subject,
            template: 'contactForm',
            context: {
                subject: 'Contact Form',
                hostName: req.headers.host,
                contactFormSubject: subject,
                name,
                email,
                phoneNumber,
                message
            }
        };

        const result = await mailSender(mailOptions);

        if (!result){
            return res.status(400).json({
                message: translate("Sending Contact Form failed.")
            });
        }

        return res.status(200).json({
            status: 200,
            message: translate("%s successfully sent.", translate("Contact Form"))
        });
    } catch (error) {
        console.error({error});
        res.status(400).json({
            message: translate("Sending Contact Form failed.")
        });
    }
})

app.listen(port, () => console.log(`Server started on port ${port}`))