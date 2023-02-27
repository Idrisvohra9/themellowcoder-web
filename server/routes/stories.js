import express from "express";
import {getStory, createStory} from "../controllers/story"

const router = express.Router();

router.get('/', getStory);
router.post("/", createStory);
export default router;