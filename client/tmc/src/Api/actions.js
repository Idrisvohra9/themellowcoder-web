import * as api from './index'

// Action Creator: functions that return an action.
// We use thunk to make it asynchronous:

export const getUsers = () => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.fetchUsers();
        dispatch({ type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}
export const getUser = (username) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.fetchSingleUser(username);
        dispatch({ type: 'FETCH_SPECIFIC', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}
export const createUser = (userData) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.addUser(userData);
        console.log("User created successfully.");
        console.log(data);
        dispatch({ type: 'CREATE', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (postData) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.addPost(postData);

        dispatch({ type: 'CREATE', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}
export const updatePost = (id, postData) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.updatePost(id, postData);

        dispatch({ type: 'UPDATE', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        
    }
}
export const createStory = (storyData) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.addStory(storyData);

        dispatch({ type: 'CREATE', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}
export const getStories = () => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.fetchStories();
        dispatch({ type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}