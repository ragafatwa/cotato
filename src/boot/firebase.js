import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDb5xhp1Lj6zopPZ9HAv9npIW76vYUOaWQ",
  authDomain: "coutato.firebaseapp.com",
  projectId: "coutato",
  storageBucket: "coutato.appspot.com",
  messagingSenderId: "194417297275",
  appId: "1:194417297275:web:62137a8d60cc8876eadfde"
};


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db

