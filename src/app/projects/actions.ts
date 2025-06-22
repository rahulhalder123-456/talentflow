
'use server';

import { db, collection, query, where, getDocs } from '@/lib/firebase/client';
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

/**
 * Revalidates the cache for the dashboard and projects pages.
 * This is called after a new project is created to ensure the UI updates.
 */
export async function revalidateProjectPaths() {
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');
}


export async function getProjectsByUserId(userId: string) {
  if (!userId) {
    return { success: false, error: 'User ID is required.', projects: [] };
  }
  try {
    const q = query(collection(db, 'projects'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            deadline: data.deadline?.toDate().toISOString() || new Date().toISOString(),
        };
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: getFirebaseErrorMessage(error), projects: [] };
  }
}

export async function getAllProjects() {
  try {
    const q = query(collection(db, 'projects'));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            deadline: data.deadline?.toDate().toISOString() || new Date().toISOString(),
        };
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return { success: false, error: getFirebaseErrorMessage(error), projects: [] };
  }
}
