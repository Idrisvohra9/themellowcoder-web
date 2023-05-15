import express from "express";
import postModel from "./models/postModel.js"
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
const router = express.Router();


//$ Controllers:
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({}).sort({ createdAt: -1 }).limit(20).populate("postedBy", ["username", "dp"]);

        // A message to the user that everthing went right and return the json containing all the posts data

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Fetches a specific postDetails according to the slug
const getPost = async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await postModel.findOne({ slug: slug }).populate("postedBy", ["username", "dp"]);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await postModel.create(post);
        const userId = post.postedBy;
        console.log("userId", userId);

        const postId = post._id;
        console.log("postId", postId);

        const userPosted = userModel.findById(userId);
        console.log("userPosted", userPosted);
        
        await userModel.findByIdAndUpdate(userId, { ...userPosted, posts: userPosted.posts.push(postId) }, { new: true });

        // Successful creation:
        res.status(201).json(newPost);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const newPostData = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id.")
    }
    const updatedPost = await postModel.findByIdAndUpdate(_id, { ...newPostData, _id: _id }, { new: true });
    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id.")
    }
    await postModel.findByIdAndRemove(_id);

    res.json({ message: "Post Deleted successfully" });
}
const addLike = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);
    let revertLike = false;
    let response = "post liked";
    if (!post) {
        throw new Error('Post not found');
    }
    async function like() {
        post.likedBy.push(userId);
        await post.updateOne({ likedBy: post.likedBy });
    }
    // If the user has already liked the post, remove it's id from the likedBy array.
    if (post.likedBy.includes(userId)) {
        revertLike = true;
        let index = post.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        await post.updateOne({ likedBy: post.likedBy });
        response = "like removed";
    }
    // If the user has already disliked the post, remove it's id from the dislikedBy array and add it to the likedBy array.

    if (post.dislikedBy.includes(userId)) {
        let index = post.dislikedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.dislikedBy.splice(index, 1);
        }
        await post.updateOne({ dislikedBy: post.dislikedBy });
        like();
    }
    else if (!post.likedBy.includes(userId) && !post.dislikedBy.includes(userId) && !revertLike) {
        like();
    }
    res.status(200).json(response);

}
const addDislike = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);
    let revertUnlike = false
    let response = "";
    if (!post) {
        throw new Error('Post not found');
    }
    async function dislike() {
        post.dislikedBy.push(userId);
        await post.updateOne({ dislikedBy: post.dislikedBy });
    }
    // If the user has already disliked the post, remove it's id from the dislikedBy array.
    if (post.dislikedBy.includes(userId)) {
        revertUnlike = true;
        let index = post.dislikedBy.indexOf(userId);
        // remove the element at the found index
        if (index > -1) {
            post.dislikedBy.splice(index, 1);
        }
        await post.updateOne({ dislikedBy: post.dislikedBy });
        response = "dislike removed";
    }
    // If the user has already liked the post, remove it's id from the dislikedBy array and add it to the likedBy array.

    if (post.likedBy.includes(userId)) {
        let index = post.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        await post.updateOne({ likedBy: post.likedBy });
        dislike();
    }
    else if (!post.likedBy.includes(userId) && !post.dislikedBy.includes(userId) && !revertUnlike) {
        dislike();
    }
    res.status(200).json(response);
}
// const addReply = async (req,res) => {

// }
// If the method is get the router will point to the post path which is by default '/'
router.get('/', getAllPosts);// Fetch all
router.get('/:slug', getPost);// Get single
router.post("/", createPost);// Create new
router.patch('/update/:id', updatePost);// Update
router.post('/like', addLike);// Update
router.delete('/:_id', deletePost);// Delete
router.post('/dislike', addDislike);// Update

export default router;