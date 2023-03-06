import axios from "axios";

// Get users
export const fetchUsers = () => axios.get("http://localhost:5000/users")
export const addUser = (newUser) => axios.post("http://localhost:5000/users/create")

export const fetchPosts = () => axios.get("http://localhost:5000/posts")
export const addPost = (newPost) => axios.post("http://localhost:5000/posts/create")

export const fetchStories = () => axios.get("http://localhost:5000/stories")
export const addStory = (newPost) => axios.post("http://localhost:5000/posts/create")
