import mongoose, { Schema } from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const storySchema = new mongoose.Schema({
    title: String,
    body: String,
    postedBy: { type: Schema.Types.ObjectId, ref: "userModel" },
    type: String,
    image: String,
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + (2 * 24 * 60 * 60 * 1000) // 2 days in milliseconds
    }
});

const storyModel = mongoose.model("StoryModel", storySchema);

export default storyModel;