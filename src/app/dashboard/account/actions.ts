
'use server';

import { db, collection, doc, getDoc, getDocs } from '@/lib/firebase/client';
import { revalidatePath } from 'next/cache';

// A helper to provide more specific error messages
function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('PERMISSION_DENIED')) {
      if (error.message.includes('Cloud Firestore API has not been used')) {
        return 'Firestore API is not enabled for this project. Please enable it in the Google Cloud Console and try again.';
      }
      return 'Permission Denied. Your Firestore security rules are blocking this action. Go to the Firebase Console > Firestore > Rules and update them.';
    }
    return error.message;
  }
  return 'An unknown error occurred.';
}

// --- Profile Actions ---

export async function getUserProfile(userId: string) {
  if (!userId) return { success: false, error: 'User not authenticated.' };
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { success: true, profile: docSnap.data() };
    }
    return { success: true, profile: null };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}

// --- Payment Method Actions ---

export async function getPaymentMethods(userId: string) {
  if (!userId) return { success: false, error: 'User not authenticated.', methods: [] };
  try {
    const paymentMethodsRef = collection(db, 'users', userId, 'paymentMethods');
    const querySnapshot = await getDocs(paymentMethodsRef);
    const methods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, methods };
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return { success: false, error: getFirebaseErrorMessage(error), methods: [] };
  }
}
