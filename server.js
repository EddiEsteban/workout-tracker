const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 8080

const db = require("./models");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( express.static('public') )

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT)
})