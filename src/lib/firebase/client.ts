
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  type AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp, doc, getDoc, setDoc, deleteDoc, onSnapshot, orderBy, updateDoc, limit, writeBatch, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// --- Firebase Configuration ---
// Load config from environment variables to keep keys secure
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// --- Initialize Firebase ---
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// --- Conditionally Load Analytics ---
const analyticsPromise: Promise<ReturnType<typeof getAnalytics> | null> =
  typeof window !== "undefined"
    ? isSupported().then((supported) =>
        supported ? getAnalytics(app) : null
      )
    : Promise.resolve(null);

// --- Social Providers ---
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

// --- Social Sign-In Utility ---
const socialSignIn = async (provider: FirebaseAuthProvider) => {
  return await signInWithPopup(auth, provider);
};

// --- Export ---
export {
  app,
  auth,
  db,
  storage,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  analyticsPromise,
  googleProvider,
  githubProvider,
  microsoftProvider,
  socialSignIn,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  updateDoc,
  limit,
  writeBatch,
  arrayUnion,
  arrayRemove,
};
