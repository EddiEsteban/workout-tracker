const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 8080

const router = require("./controllers/router.js");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( express.static('public') )

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

router(app)

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT)
})