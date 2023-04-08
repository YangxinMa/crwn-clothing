import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAqTGUjXAtRgqSd4FZia0djlDbWNZTbNCM",
    authDomain: "crwn-clothing-db-d1435.firebaseapp.com",
    projectId: "crwn-clothing-db-d1435",
    storageBucket: "crwn-clothing-db-d1435.appspot.com",
    messagingSenderId: "28172473148",
    appId: "1:28172473148:web:c6b2d9bc941d50f5acc439"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const SignInWithGooglePopup = () =>
    signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // check user exist
    //if user data does not exist
    //create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    //if user data exists
    //return userDocRef
    return userDocRef;
}
