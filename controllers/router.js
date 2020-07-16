const db = require("../models")

// (async()=>{let thing = await db.Workout.find({}); console.log(thing)})()



// getLastWorkout()
function router(app){
    // HTML Routes
    app.get('/', (req, res)=>{
        res.sendFile('./index.html', { root: public })
    })
    
    app.get('/exercise', async (req, res)=>{
        let id = req.query.id
        try{
            let exercise = await db.Workout.find({_id: id})
            res.sendFile('./exercise.html', { root: public })
        }catch(err){res.status(400).send(err)}
        // res.sendFile('./exercise.html', { root: public })
    })


    
    app.get('/stats', (req, res)=>{
        res.sendFile('./stats.html', { root: public })
    })

    // API Routes
    // getLastWorkout()
    app.get("/api/workouts",  async (req, res) => {
        console.log('my GET /api/workouts')
        try {
            let dbWorkouts = await db.Workout.find({})
            res.status(200).send(dbWorkouts)
        } catch (err){
            console.log('failed')
            res.status(400).send(err)
        }
    
    })

    // addExercise(data)
    app.put('/api/workouts/:id', async(req, res)=>{
        console.log('my PUT /api/workouts/:id, body: ', req.body)
        try{
            const workoutId = req.params.id
            const updateResult = await db.Workout.updateOne({_id:workoutId}, {$push: {exercises: [req.body]}})
            res.status(200).send(updateResult)
        }catch(err){
            console.log('failed')
            res.status(400).send(err)
        }
    })

    // createWorkout(data = {})
    app.post('/api/workouts/', async(req, res)=>{
        
        console.log('my POST /api/workouts/, body:', req.body)
        try{
            let postedWorkout = await db.Workout.create(req.body)
            res.status(200).send(postedWorkout)
        }catch(err){
            console.log('failed')
            res.status(400).send(err)
        }
    })

    // getWorkoutsInRange()
    app.get('/api/workouts/range', async(req, res)=>{
        console.log('my GET api/workouts/range')
        try{
            let dbWorkouts = await db.Workout.find({})
            res.status(200).send(dbWorkouts)
        }catch(err){
            console.log('failed')
            res.status(400).send(err)
        }
    })
}
module.exports = router