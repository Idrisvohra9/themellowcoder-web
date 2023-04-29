import mongoose from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    desc: String,
    joinDate: String,
    tags: [String],
    dp: {
        type: String,
        default: ""
    },
    tmcPoints: {
        type: Number,
        default: 0,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostModel"
    }],
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoryModel"
    }],
    plannedCodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlanCodeModel"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }]
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;