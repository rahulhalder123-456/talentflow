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

// --- Environment Variable Validation ---
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Firebase configuration is incomplete. Please copy the ".env.local.example" file to ".env.local" and fill in your Firebase project credentials. After that, you MUST restart the server. The following variables are missing:\n- ${missingEnvVars.join('\n- ')}`
  );
}

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // optional
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
