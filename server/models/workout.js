import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["stength", "cardio"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    
    sets: Number,
    reps: Number,
    weight: Number,

    duration: Number,
    distance: Number,
    intensity: {
        type: String,
        enum: ["low", "medium", "high"]
    },
});

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: { type: String, enum: ["user", "system"], default: "user" },
    exercises: [exerciseSchema],
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
