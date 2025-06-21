
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

// --- Firebase Configuration ---
// IMPORTANT: These values are hardcoded for debugging purposes to resolve an
// authorization issue. This is not a recommended practice for production.
const firebaseConfig = {
  apiKey: "AIzaSyA-Q26KTxW5Ysn4N6ngD5dj6W6bIIzdwr0",
  authDomain: "my-platform-3cc40.firebaseapp.com",
  projectId: "my-platform-3cc40",
  storageBucket: "my-platform-3cc40.appspot.com",
  messagingSenderId: "1027782203084",
  appId: "1:1027782203084:web:301b8a7d91a4b3f5961469",
};


// --- Initialize Firebase ---
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

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
  analyticsPromise,
  googleProvider,
  githubProvider,
  microsoftProvider,
  socialSignIn,
};
