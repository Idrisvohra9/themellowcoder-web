import mongoose from "mongoose";

const planCodeSchema = new mongoose.Schema({
    projTitle: {
        type: String, unique: true
    },
    projDesc: String,
    technologies: [String],
    cover: String,
    privacy: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }],
    steps: [String],
    stepDesc: [String],
    priority: [String],
    completionStatus: [String],
    dependency: [String],
    notes: [String],
    assignedUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }],
    progress: Number,
    milestones: [String],
    expectedEnd: [String],
});

const planCodeModel = mongoose.model("PlanCodeModel", planCodeSchema);

export default planCodeModel;