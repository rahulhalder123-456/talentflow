
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  type AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that all Firebase config values are present.
const missingConfigKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingConfigKeys.length > 0) {
  const varNames = missingConfigKeys.map(key => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);
  const errorMessage = `Firebase configuration is incomplete. Please add the following environment variables to your .env file: ${varNames.join(', ')}. After adding them, you MUST restart your development server.`;
  throw new Error(errorMessage);
}


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Social Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

const socialSignIn = async (provider: FirebaseAuthProvider) => {
  return await signInWithPopup(auth, provider);
};

export { app, auth, googleProvider, githubProvider, microsoftProvider, socialSignIn };
