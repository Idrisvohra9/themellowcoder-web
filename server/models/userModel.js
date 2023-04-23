import mongoose from "mongoose";

// Schema is a rule for every columns of post that is going to be stored i mongodb as documents
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: String,
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
    postsCount: {
        type: Number,
        default: 0,
    },
    storiesCount: {
        type: Number,
        default: 0
    },
    friends: [String]
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;