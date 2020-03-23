import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBlLWxrcv6sGaNCjXqeF2ijQzAXqpexpfQ",
  authDomain: "crown-clothing-200a0.firebaseapp.com",
  databaseURL: "https://crown-clothing-200a0.firebaseio.com",
  projectId: "crown-clothing-200a0",
  storageBucket: "crown-clothing-200a0.appspot.com",
  messagingSenderId: "444769998605",
  appId: "1:444769998605:web:769421b030bb4d8f81c244"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
