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

export const createUser = (userData) => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.addUser(userData);

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
export const getStories = () => async (dispatch) => {
    try {
        // Getting the response object from the api which has the key data (object) and that is users
        const { data } = await api.fetchStories();
        dispatch({ type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}