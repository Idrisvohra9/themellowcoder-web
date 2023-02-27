import mongoose from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const postSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    desc: String,
    joinDate: String,
    tags: [String],
    dp: {
        type: String,
        default: null
    },
    tmcPoints: {
        type: Number,
        default: 0,
    },
    postsCount: {
        type: Number,
        default: 0,
    },
    storiesCount: {
        type: Number,
        default: 0
    },
    friendsCount:{
        type: Number,
        default: 0
    },
    friends:[String]
});

const postModel = mongoose.model("PostModel", postSchema);

export default postModel;