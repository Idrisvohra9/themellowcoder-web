import mongoose, { Schema } from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const storySchema = new mongoose.Schema({
    title: String,
    body: String,
    postedBy: { type: Schema.Types.ObjectId, ref: "userModel" },
    tags: [String],
    image: String,
    likeCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const storyModel = mongoose.model("StoryModel", storySchema);

export default storyModel;