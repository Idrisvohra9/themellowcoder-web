import express from "express";
import storyModel from "./models/storyModel.js"
import mongoose from "mongoose";
const router = express.Router();

// $Controllers:
// This takes time hence we make it asynchronous function
export const getAllStories = async (req, res) => {
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

const updateStory = async (req, res) => {
    const { id: _id } = req.params;
    const story = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No story with that id.")
    }
    const patchedStory = await storyModel.findByIdAndUpdate(_id, story, { new: true });
    res.json(patchedStory);
}
router.get('/', getAllStories);
router.post("/", createStory);
router.patch("/:id", updateStory);
router.delete()
export default router;