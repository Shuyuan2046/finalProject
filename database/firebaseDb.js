// database/firebaseDb.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3Sj7sQ9bkaj5lc3Wj5V8MuFpi9gtqeOM",
    authDomain: "reactnativefirebase-c9491.firebaseapp.com",
    databaseURL: "https://reactnativefirebase-c9491.firebaseio.com",
    projectId: "reactnativefirebase-c9491",
    storageBucket: "reactnativefirebase-c9491.appspot.com",
    messagingSenderId: "634328617327",
    appId: "1:634328617327:web:806cb3447c45b77d10189a"
};

//firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
