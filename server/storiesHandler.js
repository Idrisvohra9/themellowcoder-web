import express from "express";
import storyModel from "./models/storyModel.js"
const router = express.Router();
import { URL } from 'url';
import path from "path";
import multer from "multer";
import moment from "moment";
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

// $Controllers:
// This takes time hence we make it asynchronous function
export const getAllStories = async (req, res) => {
    try {
        const stories = await storyModel.find({}).sort({ createdAt: -1 }).limit(20).populate("postedBy", ["username", "dp"]);

        // A message to the user that everthing went right and return the json containing all the stories data

        res.status(200).json(stories);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createStory = async (req, res) => {
    const story = req.body;
    try {
        const newStory = await storyModel.create(story);
        // Successful creation:
        res.status(201).json(newStory);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}

const deleteStory = async (req, res) => {
    try {
        // Get all stories that are older than 48 hours
        const cutoff = moment().subtract(48, 'hours').toDate();
        const oldStories = await storyModel.find({ createdAt: { $lt: cutoff } });
        
        // Delete each old story
        for (const story of oldStories) {
          await story.remove();
        }
        
      } catch (error) {
        console.error(error);
      }
}

const uploadsPath = path.join(__dirname, 'uploads', "stories");
router.get('/', getAllStories);
router.post("/", upload.single("cover"), createStory);
router.delete("/:id", deleteStory);
router.use("/uploads/stories", express.static(uploadsPath));

export default router;