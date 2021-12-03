// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Sj7sQ9bkaj5lc3Wj5V8MuFpi9gtqeOM",
  authDomain: "fir-auth-c9491.firebaseapp.com",
  projectId: "fir-auth-c9491",
  storageBucket: "fir-auth-c9491.appspot.com",
  messagingSenderId: "634328617327",
  appId: "1:634328617327:web:806cb3447c45b77d10189a"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };