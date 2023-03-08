import axios from "axios";

const url = "http://localhost:5000/";
// Get users
export const fetchUsers = () => axios.get(url+"users")
export const addUser = (newUser) => axios.post(url+"users/create", newUser)

export const fetchPosts = () => axios.get(url+"posts")
export const addPost = (newPost) => axios.post(url+"posts", newPost)

export const fetchStories = () => axios.get(url+"stories")
export const addStory = (newStory) => axios.post(url+"stories", newStory)
