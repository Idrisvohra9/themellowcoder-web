import express from "express";
import storyModel from "./models/storyModel.js"
const router = express.Router();

// $Controllers:
// This takes time hence we make it asynchronous function
export const getStory = async (req, res) => {
    try {
        const stories = await storyModel.find();

        // A message to the user that everthing went right and return the json containing all the stories data

        res.status(200).json(stories);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createStory = async (req, res) => {
    const body = req.body;
    const newStory = new storyModel()
    try {
        await newStory.save();
        // Successful creation:
        res.status(201).json(newStory);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
router.get('/', getStory);
router.post("/create", createStory);

export default router;