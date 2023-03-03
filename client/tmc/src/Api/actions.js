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