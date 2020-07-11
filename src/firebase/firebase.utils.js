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

   
  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName , email } = userAuth;
      const createdAt = new Date();

      try {

        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
        
      } catch (error) {
        console.log(`Error creating user. ${error.message}`);
      }
    }
    return userRef;
  };
  
  export const addCollectionAndDocuments = async (collectionkey, objectsToAdd)=> {
    const collectionRef = firestore.collection(collectionkey);
    const batch = firestore.batch();
    objectsToAdd.forEach( object=> {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef , object);
    });
    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        routeName : encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items
      };
    });
    
    return transformedCollection.reduce((acc, collection)=>{
      acc[collection.title.toLowerCase()] = collection;
      return acc;
    },{});
  };
 
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;