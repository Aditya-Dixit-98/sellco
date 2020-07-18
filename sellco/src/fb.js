import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCXe8KtRRjyyYmrb4XK-whQHsY0BTZbZQU",
    authDomain: "sellco-b750c.firebaseapp.com",
    databaseURL: "https://sellco-b750c.firebaseio.com",
    projectId: "sellco-b750c",
    storageBucket: "sellco-b750c.appspot.com",
    messagingSenderId: "973801341601",
    appId: "1:973801341601:web:721141d10d12a72a3466e0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db
  
