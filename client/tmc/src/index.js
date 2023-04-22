import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setCookie, getCookie } from './tools/cookies';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from "redux-thunk"
import reducers from "./Api/reducers.js"

const root = createRoot(document.getElementById('root'));
if (getCookie("cookie-consent") === "") {
  setCookie("cookie-consent", "false");
}
// setCookie("username","");
if (getCookie("active-theme") === "") {
  setCookie("active-theme", "Original")
}
// console.log(process.env.REACT_APP_BACKEND_URL);
const store = createStore(reducers, compose(applyMiddleware(thunk)))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
