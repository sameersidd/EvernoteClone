import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
	apiKey: "AIzaSyCrOWNFSazD06uQsskMit0p6njsaQZp0HI",
	authDomain: "evernote-7e70e.firebaseapp.com",
	databaseURL: "https://evernote-7e70e.firebaseio.com",
	projectId: "evernote-7e70e",
	storageBucket: "evernote-7e70e.appspot.com",
	messagingSenderId: "206677029040",
	appId: "1:206677029040:web:ffe1d15f7bc1404cbe4b75"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("evernote-container"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
