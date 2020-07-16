const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({ // maps to a collection, describes the shape of its documents
    day: {type: Date, default: Date.now},
    exercises: [{ // maps to a collection, describes the shape of its documents
        type: { type: String, trim: true, required: "type required" },
        name: { type: String, trim: true, required: "name required" },
        duration: { type: Number, trim: true, required: "duration required" },
        weight: { type: Number, trim: true },
        sets: { type: Number, trim: true },
        reps: { type: Number, trim: true },
        distance: { type: Number, trim: true },
        createdAt: { type: Date, default: Date.now }
    }],
    // _id: Schema.Types.ObjectId
});

const Workout = mongoose.model("Workout", WorkoutSchema); // makes new mongodb documents

module.exports = Workout;
