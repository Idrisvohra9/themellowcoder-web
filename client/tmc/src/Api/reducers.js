import { combineReducers } from "redux";

export default combineReducers({

});
// What is redux?
// Redux is used to maintain and update data across your applications for multiple components to share, all while remaining independent of the components.

// We are going to define reducer functions in this file only.

// Reducers are the only way to change states in Redux. It is the only place where you can write logic and calculations. Reducer function will accept the previous state of app and action being dispatched, calculate the next state and returns the new object.

const userReducer = (users = [], action) => {
    switch (action.type) {
        case "CREATE":
            return users;

        case "FETCH_ALL":
            return users;

        case "FETCH_SPECIFIC":
            return users;

        case "DELETE_SPECIFIC":
            return users;

        default:
            return users;

    }
}

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case "CREATE":
            return posts;

        case "FETCH_ALL":
            return posts;

        case "FETCH_SPECIFIC":
            return posts;

        case "DELETE_SPECIFIC":
            return posts;

        default:
            return posts;

    }
}

const storyReducer = (stories = [], action) => {
    switch (action.type) {
        case "CREATE":
            return stories;

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