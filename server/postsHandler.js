import express from "express";
import postModel from "./models/postModel.js"

const router = express.Router();

router.get('/', getPost);
router.post("/create", createPost);


//$ Controllers:
const getPost = async (req, res) => {
    try {
        const posts = await postModel.find();

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
export default router;