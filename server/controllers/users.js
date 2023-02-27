import userModel from "../models/userModel.js"

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
    const body = req.body;
    const newUser = new userModel()
    try {
        await newUser.save();
        // Successful creation:
        res.status(201).json(newUser);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}