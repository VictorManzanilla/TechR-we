
import firebase from 'firebase/app'
import 'firebase/auth'
 
 // Your web app's Firebase configuration
  const firebaseConfig = process.env.FIREBASE_CONFIG
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()