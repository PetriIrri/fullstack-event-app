/**
 * Index module for frontend app.
 * @module src/index
 * @author Petri Irri
 * @requires react
 * @requires module:src/App
 * @requires module:src/EventDetails
 * @requires src/index.css
 * @requires bootstrap/dist/css/bootstrap.min.css
 * @requires src/reportWebVitals
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
