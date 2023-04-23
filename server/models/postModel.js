import mongoose, { Schema } from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    tags: [String],
    likedBy: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
    dislikeby: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
    slug: { type: String, unique: true },
    isReply: {
        type: Boolean,
        default: false
    },
    replyId: {
        type: Schema.Types.ObjectId,
        ref: "PostModel",
        default: ""
    },
}, {
    timestamps: true,
});

const postModel = mongoose.model("PostModel", postSchema);

export default postModel;