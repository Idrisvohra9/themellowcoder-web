import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { setCookie, getCookie } from './tools/cookies';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"
import reducers from "./Api/reducers"

const root = createRoot(document.getElementById('root'));
if (getCookie("cookie-consent") === "") {
  setCookie("cookie-consent", "false");
}
const store = configureStore(reducers, compose(applyMiddleware(thunk)))
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// reportWebVitals();
