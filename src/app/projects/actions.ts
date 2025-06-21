
'use server';

import { z } from 'zod';
import { db, collection, addDoc, query, where, getDocs, serverTimestamp } from '@/lib/firebase/client';

const projectSchema = z.object({
  projectTitle: z.string().min(5),
  projectBrief: z.string().min(20),
  desiredSkills: z.string().min(3),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/),
  projectDescription: z.string().optional(),
  userId: z.string(),
});

export async function createProject(data: z.infer<typeof projectSchema>) {
  const parsedData = projectSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: "Invalid project data." };
  }

  try {
    await addDoc(collection(db, 'projects'), {
      ...parsedData.data,
      status: 'Open',
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to save project to the database.' };
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
        };
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Could not fetch projects.', projects: [] };
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
        };
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return { success: false, error: 'Could not fetch projects.', projects: [] };
  }
}
