import express from "express";
import postModel from "./models/postModel.js"

const router = express.Router();


//$ Controllers:
const getPost = async (req, res) => {
    try {
        const posts = await postModel.find().sort({_id: -1}).limit(10);

        // A message to the user that everthing went right and return the json containing all the posts data

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new postModel()
    try {
        await newPost.save();
        // Successful creation:
        res.status(201).json(newPost);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
// If the method is get the router will point to the post path which is by default '/'
router.get('/', getPost);
// And if the method is post it will point to the post path which is by default '/create' hence resulting in creating a new post
router.post("/create", createPost);

export default router;