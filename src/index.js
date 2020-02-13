import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: "evernote-7e70e.firebaseapp.com",
	databaseURL: "https://evernote-7e70e.firebaseio.com",
	projectId: "evernote-7e70e",
	storageBucket: "evernote-7e70e.appspot.com",
	messagingSenderId: "206677029040",
	appId: process.env.REACT_APP_appId
};
console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("evernote-container"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
