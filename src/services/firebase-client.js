import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDQuFKvmU4pKNN99MtgfyiKlJr-mCc9VaI",
  authDomain: "pour-over-guides.firebaseapp.com",
  databaseURL: "https://pour-over-guides.firebaseio.com",
  projectId: "pour-over-guides",
  storageBucket: "pour-over-guides.appspot.com",
  messagingSenderId: "874558443055",
  appId: "1:874558443055:web:41256a15e7e9ab76a7c0da",
  measurementId: "G-3G8CQ1J701"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;

