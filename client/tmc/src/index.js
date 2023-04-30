import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from "redux-thunk"
import reducers from "./Api/reducers.js"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
const root = createRoot(document.getElementById('root'));
// if (getCookie("cookie-consent") === "") {
//   setCookie("cookie-consent", "false");
// }
// console.log(getCookie("uid"));
// setCookie("username","");

// console.log(process.env.REACT_APP_BACKEND_URL);
const store = createStore(reducers, compose(applyMiddleware(thunk)))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
