
'use server';

import { z } from 'zod';
import { db, collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc, serverTimestamp } from '@/lib/firebase/client';
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

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export async function updateUserProfile(userId: string, data: z.infer<typeof profileSchema>) {
  if (!userId) return { success: false, error: 'User not authenticated.' };
  const parsedData = profileSchema.safeParse(data);
  if (!parsedData.success) return { success: false, error: 'Invalid data.' };

  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { ...parsedData.data, email: data.email }, { merge: true });
    revalidatePath('/dashboard/account');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}

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

const paymentMethodSchema = z.object({
  brand: z.string(),
  last4: z.string(),
  expMonth: z.number(),
  expYear: z.number(),
});

export async function addPaymentMethod(userId: string, cardData: z.infer<typeof paymentMethodSchema>) {
  if (!userId) return { success: false, error: 'User not authenticated.' };
  const parsedData = paymentMethodSchema.safeParse(cardData);
  if (!parsedData.success) return { success: false, error: 'Invalid card data.' };
  
  try {
    const paymentMethodsRef = collection(db, 'users', userId, 'paymentMethods');
    await addDoc(paymentMethodsRef, { ...parsedData.data, createdAt: serverTimestamp() });
    revalidatePath('/dashboard/account');
    return { success: true };
  } catch (error) {
    console.error('Error adding payment method:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}

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

export async function removePaymentMethod(userId: string, methodId: string) {
  if (!userId) return { success: false, error: 'User not authenticated.' };
  if (!methodId) return { success: false, error: 'Method ID is required.' };
  
  try {
    const methodRef = doc(db, 'users', userId, 'paymentMethods', methodId);
    await deleteDoc(methodRef);
    revalidatePath('/dashboard/account');
    return { success: true };
  } catch (error) {
    console.error('Error removing payment method:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}
