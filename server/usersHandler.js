import express from "express";
import userModel from "./models/userModel.js"

const router = express.Router();


// This takes time hence we make it asynchronous function
export const getUser = async (req, res) => {
    try {
        const users = await userModel.find();

        // A message to the user that everthing went right and return the json containing all the users data

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new userModel(user);
    try {
        await newUser.save();
        // Successful creation:
        res.status(200).json(newUser);
    } catch (error) {
        // Unsuccessful creation"
        res.status(404).json({ message: error.message })
    }
}
router.get('/', getUser);
router.post("/create", createUser);

export default router;