import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDE2rR4EFm3VWrEWH2nXl8pmnnu0OSJdHY",
    authDomain: "crwn-db-ce1f4.firebaseapp.com",
    databaseURL: "https://crwn-db-ce1f4.firebaseio.com",
    projectId: "crwn-db-ce1f4",
    storageBucket: "crwn-db-ce1f4.appspot.com",
    messagingSenderId: "1074700548567",
    appId: "1:1074700548567:web:7654d88e27b18c98c8f392",
    measurementId: "G-5FKG4VRCZH"
  };

  firebase.initializeApp(config);
 
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;