import firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyDz2d_g-nHBa6KZK0HT7dWybh7y9zr5g7Q",
    authDomain: "crud-2074b.firebaseapp.com",
    databaseURL: "https://crud-2074b-default-rtdb.firebaseio.com",
    projectId: "crud-2074b",
    storageBucket: "crud-2074b.appspot.com",
    messagingSenderId: "434155240180",
    appId: "1:434155240180:web:7fe3783d0c5e4f6157bca1"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig)