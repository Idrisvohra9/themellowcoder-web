import axios from "axios";

const url = process.env.REACT_APP_SERVER;
// Get users
export const fetchUsers = () => axios.get(url + "users")
export const addUser = (newUser) => axios.post(url + "users", newUser)
export const fetchSingleUser = (username) => axios.get(url + `users/${username}`)
// export const getDP = (username) => axios.get(url + `users/${username}`)

export const fetchPosts = () => axios.get(url + "posts")
export const addPost = (newPost) => axios.post(url + "posts", newPost)
export const updatePost = (id, newPost) => axios.patch(url + `posts/update/${id}`, newPost)
export const fetchSinglePost = (slug) => axios.get(url + `posts/${slug}`)
export const deletePost = (_id) => axios.delete(url + `posts/${_id}`)

export const fetchStories = () => axios.get(url + "stories")
export const addStory = (newStory) => axios.post(url + "stories", newStory)
