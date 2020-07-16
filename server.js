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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
(async()=>{let thing = await db.Workout.find({}); console.log(thing)})()

app.get("/api/workouts",  async (req, res) => {
    console.log('GET /api/workouts')
    try {
        console.log('trying')
        let dbWorkouts = await db.Workout.find({})
        res.status(200).send(dbWorkouts)
    } catch (err){
        console.log('fail')
        res.status(404).send(err)
    }
    // db.Workout.find({})
    // .then(dbWorkout => {
    //   res.json(dbWorkout);
    // })
    // .catch(err => {
    //   res.json(err);
    // });
})

app.post('/api/workouts/:id', async(req, res)=>{
    console.log('GET /api/workouts/:id, body: ', req.body)

    let postedWorkout
    try{
        postedWorkout = await db.Workout.create({
            date: req.body.date,
            title: req.body.title
        })
        console.log(`.. created workout: id=`, req.params.id)
        const workoutId = req.params.id

        const updateResult = await db.Workout.
        res.status(true).send(`Successfully added workout`)
    }catch(err){
        res.status('404').send(err)
    }
})

app.put('/api/workouts/', async(req, res)=>{
    console.log('GET (id) endpoint successfully reached')
    try{
        const dbWorkout = await db.Workout.find({id})
        res.status('success').send(dbWorkout)
    }catch(err){
        res.status('404').send(err)
    }
})

app.get('/api/workouts/range', async(req, res)=>{
    console.log('GET (id) endpoint successfully reached')
    try{
        const workoutId = req.params.id
        const dbWorkout = await db.Workout.find({id})
        res.status('success').send(dbWorkout)
    }catch(err){
        res.status('404').send(err)
    }
})


app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT)
})