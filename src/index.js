/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import store, { persistor } from "./app/store/store";
import App from "./App";
import "./index.scss";
const { BASE_URL } = process.env;

function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      // document.body.classList.add('loading-indicator');

      const {
        auth: { token },
      } = store.getState();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => {
      // document.body.classList.remove('loading-indicator');
      return response;
    },
    (err) => Promise.reject(err)
  );
}
setupAxios(axios, store);

ReactDOM.render(
  <App store={store} persistor={persistor} basename={BASE_URL} />,
  document.getElementById("root")
);
