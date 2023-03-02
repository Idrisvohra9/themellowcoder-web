import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setCookie, getCookie } from './tools/cookies';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"

const root = createRoot(document.getElementById('root'));
if(getCookie("cookie-consent") === ""){
  setCookie("cookie-consent","false");
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
