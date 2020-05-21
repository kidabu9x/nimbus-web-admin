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
const { BASE_URL } = process.env;

function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
}
setupAxios(axios, store);

ReactDOM.render(
  <App store={store} persistor={persistor} basename={BASE_URL} />,
  document.getElementById("root")
);
