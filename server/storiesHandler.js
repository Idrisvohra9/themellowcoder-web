import express from "express";
import storyModel from "./models/storyModel.js"
const router = express.Router();
import { URL } from 'url';
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import fs from "fs";

let __dirname = decodeURI(new URL('.', import.meta.url).pathname);
__dirname = __dirname.slice(1, __dirname.length);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/stories');
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
        const stories = await storyModel.find({ expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 }).populate("postedBy", ["username", "dp"]);
        console.log(stories);
        // A message to the user that everthing went right and return the json containing all the stories data

        res.status(200).json(stories);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createStory = async (req, res) => {
    const story = req.body;
    const { filename } = req.file;

    try {
        const newStory = await storyModel.create({ ...story, image: "uploads/stories/" + filename });
        // Successful creation:
        res.status(201).json(newStory);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}

const checkExpiredStories = async (req, res, next) => {
    const expiredStories = await storyModel.find({ expiresAt: { $lt: new Date() } });
    if (expiredStories.length > 0) {
        await Story.deleteMany({ _id: { $in: expiredStories.map(story => story._id) } });
    }
    next();
}

const deleteStory = async (req, res) => {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id.")
    }
    const story = await storyModel.findByIdAndRemove(_id);
    // Delete the story cover image
    fs.unlink(story.image, (err) => {
        if (err) console.error(err);
    });

    res.json({ message: "Story Deleted successfully" });
}

const addLike = async (req, res) => {
    const { storyId, userId } = req.body;
    const story = await storyModel.findById(storyId);
    let response = "story liked";
    if (!story) {
        throw new Error('Post not found');
    }
    async function like() {
        story.likedBy.push(userId);
        await story.updateOne({ likedBy: story.likedBy });
    }
    // If the user has already liked the story, remove it's id from the likedBy array.
    if (story.likedBy.includes(userId)) {
        let index = story.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            story.likedBy.splice(index, 1);
        }
        await story.updateOne({ likedBy: story.likedBy });
        response = "like removed";
    }
    else if (!story.likedBy.includes(userId)) {
        like();
    }
    res.status(200).json(response);

}

const uploadsPath = path.join(__dirname, 'uploads', "stories");

router.get('/', checkExpiredStories, getAllStories);
router.post("/", upload.single("image"), createStory);
router.delete("/:_id", deleteStory);
router.post('/like', addLike);// Update
router.use("/uploads/stories", express.static(uploadsPath));

export default router;