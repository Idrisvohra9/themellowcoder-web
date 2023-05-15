import { combineReducers } from "redux";

// What is redux?
// Redux is used to maintain and update data across your applications for multiple components to share, all while remaining independent of the components.

// We are going to define reducer functions in this file only.

// Reducers are the only way to change states in Redux. It is the only place where you can write logic and calculations. Reducer function will accept the previous state of app and action being dispatched, calculate the next state and returns the new object.

const userReducer = (users = [], action) => {
    switch (action.type) {
        case "CREATE":
            return [...users, action.payload];

        case "FETCH_ALL":
            return action.payload;

        case "FETCH_SPECIFIC":
            return action.payload;

        case "DELETE_SPECIFIC":
            return action.payload;

        case "UPDATE":
            return users.map((user) => user._id === action.payload._id ? action.payload : user);
        default:
            return users;

    }
}

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case "CREATE":
            return [...posts, action.payload];

        case "FETCH_ALL":
            return action.payload;

        case "FETCH_SPECIFIC":
            return action.payload;

        case "DELETE_SPECIFIC":
            return action.payload;
        case "UPDATE":
            // If the existing post id is the same as the new post id it will return the new post id else the old one.
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);

        default:
            return posts;

    }
}

const storyReducer = (stories = [], action) => {
    switch (action.type) {
        case "CREATE":
            return [...stories, action.payload];

        case "FETCH_ALL":
            return stories;

        case "FETCH_SPECIFIC":
            return stories;

        case "DELETE_SPECIFIC":
            return stories;

        default:
            return stories;

    }
}

export default combineReducers({
    userReducer, postReducer, storyReducer
});