const express = require('express')
const dotenv = require('dotenv').config()
const { i18nInit, translate } = require("./config/i18n");

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(i18nInit);

app.use("/hey", (req, res) => res.send(translate("greeting")))
app.use("/hi", (req, res) => res.send(req.__("greeting")))

console.log("process.env.LEVEL: ",process.env.LEVEL);

if (process.env.LEVEL === "DEBUG") {
    const designControl = require('./designControlsRoutes');
    designControl(app);
}

const mailsRoutes = require('./mailsRoutes');
app.use('/mails', mailsRoutes);

app.use((req, res)=>res.status(404).json({message:"Not Found"}));

app.listen(port, () => console.log(`Server started on port ${port}`))