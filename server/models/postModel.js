import mongoose from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const postSchema = mongoose.Schema({
    title: String,
    body: String,
    postedBy: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    dislikeCount: {
        type: Number,
        default: 0
    },
    postedAt: {
        type: Date,
        default: new Date()
    },
    slug: String
});

const postModel = mongoose.model("PostModel", postSchema);

export default postModel;