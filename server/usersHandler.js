import express from "express";
import userModel from "./models/userModel.js"
import multer from "multer";
const router = express.Router();
import { URL } from 'url';
import path from "path";

let __dirname = decodeURI(new URL('.', import.meta.url).pathname);
__dirname = __dirname.slice(1, __dirname.length);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/dp');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage })

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
        const user = await userModel.findOne({ username })
            .populate("posts")
            .populate("stories")
            .populate("plannedCodes")
            .populate("friends");
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    const { filename } = req.file;

    try {
        await userModel.create({ ...user, dp: `uploads/dp/${filename}` });
        // After user gets created we also send the _id for cookie creation.
        const { _id } = await userModel.findOne({ username: user.username });

        // Successful creation:
        res.status(200).json({ _id: _id, result: true });
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
            res.status(200).json({ _id: user._id, result: result });
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
const updateUser = async (req, res) => {

}
const uploadsPath = path.join(__dirname, 'uploads', "dp");
router.get('/', getAllUsers);
router.post('/login', login);
router.get('/:username', getUser);
router.post("/", upload.single("dp"), createUser);
router.patch('/:username', updateUser);
router.use("/uploads/dp", express.static(uploadsPath));
export default router;