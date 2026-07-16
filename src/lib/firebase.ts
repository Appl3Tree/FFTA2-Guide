import { initializeApp, type FirebaseApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    type Auth,
} from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
    serverTimestamp,
    setDoc,
    type Firestore,
} from "firebase/firestore";
import {
    firebaseConfig,
    firebaseEnabled,
    GUIDE_SLUG,
} from "./firebaseConfig";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

if (firebaseEnabled) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
}

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    firebaseEnabled,
    firebaseSignOut,
    getDoc,
    googleProvider,
    GUIDE_SLUG,
    onAuthStateChanged,
    sendPasswordResetEmail,
    serverTimestamp,
    setDoc,
    signInWithEmailAndPassword,
    signInWithPopup,
};
