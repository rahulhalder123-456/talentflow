
'use server';

import { db, collection, getDocs } from '@/lib/firebase/client';

function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('PERMISSION_DENIED')) {
      return 'Permission Denied. Please check your Firestore security rules.';
    }
    return error.message;
  }
  return 'An unknown error occurred.';
}

export async function getAllUsers() {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, users };
  } catch (error) {
    console.error('Error fetching all users:', error);
    return { success: false, error: getFirebaseErrorMessage(error), users: [] };
  }
}
