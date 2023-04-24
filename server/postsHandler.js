import express from "express";
import postModel from "./models/postModel.js"
const router = express.Router();


//$ Controllers:
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({}).sort({ createdAt: -1 }).limit(20).populate("postedBy", ["username"]);

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
        const post = await postModel.findOne({ slug: slug }).populate("postedBy", "username");

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await postModel.create(post);
        // Successful creation:
        res.status(201).json(newPost);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
const updatePost = async (req, res) => {
    const { slug } = req.params;
    const { post } = req.body;
}

const deletePost = async (req, res) => {

}
// const addLikes = async (req, res) => {

// }
// const addDislike = async (req, res) => {

// }
// const addReply = async (req,res) => {

// }
// If the method is get the router will point to the post path which is by default '/'
router.get('/', getAllPosts);// Fetch all
router.get('/:slug', getPost);// Get single
router.post("/", createPost);// Create new
router.patch('/:slug', updatePost);// Update
// router.patch('/:slug', updatePost);// Update
// router.patch('/:slug', updatePost);// Update
router.delete('/:slug', deletePost);// Delete

export default router;