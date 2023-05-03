import express from "express";
import planCodeModel from "./models/planCodeModel.js"
const router = express.Router();

//$ Controllers:
const getAllPlanCodes = async (req, res) => {
    try {
        const planCodes = await planCodeModel.find({}).sort({ createdAt: -1 }).limit(20).populate("postedBy", ["username", "dp"]);

        // A message to the user that everthing went right and return the json containing all the planCodes data

        res.status(200).json(planCodes);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Fetches a specific postDetails according to the slug
const getPlanCode = async (req, res) => {
    const { slug } = req.params;
    try {
        const planCode = await planCodeModel.findOne({ slug: slug }).populate("postedBy", ["username", "dp"]);

        res.status(200).json(planCode);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPlanCode = async (req, res) => {
    const planCode = req.body;
    try {
        const newPlanCode = await planCodeModel.create(planCode);
        // Successful creation:
        res.status(201).json(newPlanCode);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
const updatePlanCode = async (req, res) => {
    const { id: _id } = req.params;
    const newPlanCode = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id.")
    }
    const updatedPlanCode = await planCodeModel.findByIdAndUpdate(_id, newPlanCode, { new: true });
    res.json(updatedPlanCode);
}

const deletePlanCode = async (req, res) => {

}
const addLike = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await planCodeModel.findById(postId);
    let response = "post liked";
    if (!post) {
        throw new Error('Post not found');
    }
    async function like() {
        post.likedBy.push(userId);
        await post.updateOne({ likedBy: post.likedBy });
    }
    // If the user has already liked the post, remove it's id from the likedBy array.
    if (post.likedBy.includes(userId)) {
        revertLike = true;
        let index = post.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        await post.updateOne({ likedBy: post.likedBy });
        response = "like removed";
    }
    else {
        like();
    }
    res.status(200).json(response);

}

router.get('/', getAllPlanCodes);// Fetch all
router.get('/:slug', getPlanCode);// Get single
router.post("/", createPlanCode);// Create new
router.patch('/update', updatePlanCode);// Update
router.post('/like', addLike);// Update
router.delete('/:slug', deletePlanCode);// Delete

export default router;