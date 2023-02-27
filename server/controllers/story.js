import storyModel from "../models/storyModel.js"

// This takes time hence we make it asynchronous function
export const getPost = async (req, res) => {
    try {
        const stories = await storyModel.find();

        // A message to the user that everthing went right and return the json containing all the stories data

        res.status(200).json(stories);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new storyModel()
    try {
        await newPost.save();
        // Successful creation:
        res.status(201).json(newPost);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}