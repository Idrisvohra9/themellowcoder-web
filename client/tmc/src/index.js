import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { setCookie, getCookie } from './tools/cookies';
import { Provider } from 'react-redux';
// import { configureStore } from "@reduxjs/toolkit"
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from "redux-thunk"
import reducers from "./Api/reducers.js"
// resolve
const root = createRoot(document.getElementById('root'));
if (getCookie("cookie-consent") === "") {
  setCookie("cookie-consent", "false");
}
if(getCookie("active-theme") === "") {
  setCookie("active-theme","Original")
}
// console.log(process.env.REACT_APP_GREET);
const store = createStore(reducers, compose(applyMiddleware(thunk)))
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// reportWebVitals();
