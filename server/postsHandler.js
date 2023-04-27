import express from "express";
import postModel from "./models/postModel.js"
const router = express.Router();


//$ Controllers:
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({}).sort({ createdAt: -1 }).limit(20).populate("postedBy", ["username", "dp"]);

        // A message to the user that everthing went right and return the json containing all the posts data

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Fetches a specific postDetails according to the slug
const getPost = async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await postModel.findOne({ slug: slug }).populate("postedBy", ["username", "dp"]);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await postModel.create(post);
        // Successful creation:
        res.status(201).json(newPost);
    } catch (error) {
        // Unsuccessful creation"
        res.status(409).json({ message: error.message })
    }
}
const updatePost = async (req, res) => {
    const { slug } = req.params;
    const { post } = req.body;
}

const deletePost = async (req, res) => {

}
const addLike = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);
    let response = "post liked";
    if (!post) {
        throw new Error('Post not found');
    }
    async function like() {
        post.likedBy.push(userId);
        await post.updateOne({ likedBy: post.likedBy });
        res.status(200).json(response);
    }
    // If the user has already liked the post, remove it's id from the likedBy array.
    if (post.likedBy.includes(userId)) {
        let index = post.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        await post.updateOne({ likedBy: post.likedBy });
    }
    // If the user has already disliked the post, remove it's id from the dislikedBy array and add it to the likedBy array.

    if (post.dislikedBy.includes(userId)) {
        let index = post.dislikedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.dislikedBy.splice(index, 1);
        }
        await post.updateOne({ dislikedBy: post.dislikedBy });
        like();
    }
    else {
        like();
    }
}
const addDislike = async (req, res) => {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);
    let response = "post disliked";
    if (!post) {
        throw new Error('Post not found');
    }
    async function dislike() {
        post.dislikedBy.push(userId);
        await post.updateOne({ dislikedBy: post.dislikedBy });
        res.status(200).json(response);
    }
    // If the user has already disliked the post, remove it's id from the dislikedBy array.
    if (post.dislikedBy.includes(userId)) {
        let index = post.dislikedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.dislikedBy.splice(index, 1);
        }
        await post.updateOne({ dislikedBy: post.dislikedBy });
    }
    // If the user has already liked the post, remove it's id from the dislikedBy array and add it to the likedBy array.

    if (post.likedBy.includes(userId)) {
        let index = post.likedBy.indexOf(userId);

        // remove the element at the found index
        if (index > -1) {
            post.likedBy.splice(index, 1);
        }
        await post.updateOne({ likedBy: post.likedBy });
        dislike();
    }
    else {
        dislike();
    }
}
// const addReply = async (req,res) => {

// }
// If the method is get the router will point to the post path which is by default '/'
router.get('/', getAllPosts);// Fetch all
router.get('/:slug', getPost);// Get single
router.post("/", createPost);// Create new
router.patch('/update', updatePost);// Update
router.post('/like', addLike);// Update
router.post('/dislike', addDislike);// Update
router.delete('/:slug', deletePost);// Delete

export default router;