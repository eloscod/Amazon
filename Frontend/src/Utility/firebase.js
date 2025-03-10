// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";

import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgTBr928msVKJZqOcTdoVX5PlDooF3It4",
  authDomain: "clone-a5747.firebaseapp.com",
  projectId: "clone-a5747",
  storageBucket: "clone-a5747.firebasestorage.app",
  messagingSenderId: "128769018037",
  appId: "1:128769018037:web:975cef2d4318455b5e16fc",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Exporting
export const auth = getAuth(app);
export const db = app.firestore();
