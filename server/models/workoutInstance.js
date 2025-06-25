import mongoose from "mongoose";

const completedExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {type: Number},
    reps: {type: Number},
    weight: {type: Number},
    duration: {type: Number},
    distance: {type: Number},
    intensity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
});

const workoutInstanceSchema = new mongoose.Schema({
    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
    },
    completedExercises: [completedExerciseSchema]
});

const WorkoutInstance = mongoose.model("WorkoutInstance", workoutInstanceSchema);
export default WorkoutInstance;
