
import firebase from 'firebase/app'
import 'firebase/auth'
require('dotenv').config()
 
 // Your web app's Firebase configuration

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: "techr-we.firebaseapp.com",
//     projectId: "techr-we",
//     storageBucket: "techr-we.appspot.com",
//     messagingSenderId: "529440984322",
//     appId: "1:529440984322:web:90aa4f9152e74b156bc61b"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyAbsdo06pT25hxwqQDhQkZYFdlSp8MttBk",
    authDomain: "techr-we.firebaseapp.com",
    projectId: "techr-we",
    storageBucket: "techr-we.appspot.com",
    messagingSenderId: "529440984322",
    appId: "1:529440984322:web:90aa4f9152e74b156bc61b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()