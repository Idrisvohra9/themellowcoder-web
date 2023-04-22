import express from "express";
import userModel from "./models/userModel.js"

const router = express.Router();


// This takes time hence we make it asynchronous function
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        // A message to the user that everthing went right and return the json containing all the users data

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Fetches a specific userDetails according to username:
export const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await userModel.findOne({ username });
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    // const newUser = new userModel(user);
    try {
        await userModel.create(user);
        // Successful creation:
        res.status(200).json(newUser);
    } catch (error) {
        // Unsuccessful creation"
        res.status(404).json({ message: error.message })
    }
}
const login = async (req, res) => {
    const { username, pass } = req.body;
    try {
        const user = await userModel.findOne({ username });
        let result = false;
        if (user !== null) {

            if (user.password === pass) {
                result = true;
            }
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
const updateUser = async (req, res) => {

}
router.get('/', getAllUsers);
router.post('/login', login);
router.get('/:username', getUser);
router.post("/create", createUser);
router.patch('/:username', updateUser);
export default router;