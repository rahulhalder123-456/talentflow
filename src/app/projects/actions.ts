
'use server';

import { z } from 'zod';
import { db, collection, addDoc, query, where, getDocs, serverTimestamp } from '@/lib/firebase/client';
import { type ProjectFormValues, ProjectFormSchema } from '@/app/projects/types';
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

export async function createProject(values: ProjectFormValues, userId: string) {
  if (!userId) {
    return { success: false, error: 'User not authenticated.' };
  }

  const validatedFields = ProjectFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: 'Invalid project data.' };
  }

  try {
    await addDoc(collection(db, 'projects'), {
      ...validatedFields.data,
      userId: userId,
      status: 'Open',
      createdAt: serverTimestamp(),
      deadline: validatedFields.data.deadline,
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');

    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
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
