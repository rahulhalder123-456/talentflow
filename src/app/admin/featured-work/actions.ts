
'use server';

import { db, collection, addDoc, serverTimestamp, deleteDoc, doc } from '@/lib/firebase/client';
import type { FeaturedProjectFormValues } from '@/features/landing/types';
import { revalidatePath } from 'next/cache';

export async function addFeaturedProject(projectData: FeaturedProjectFormValues) {
    try {
        await addDoc(collection(db, 'featuredProjects'), {
            ...projectData,
            createdAt: serverTimestamp(),
        });
        // Revalidate the homepage to show the new project immediately
        revalidatePath('/');
        revalidatePath('/admin/featured-work');
    } catch (error) {
        console.error("Error adding featured project: ", error);
        throw new Error("Could not add project to Firestore. Check permissions.");
    }
}

export async function deleteFeaturedProject(projectId: string) {
    try {
        const projectRef = doc(db, 'featuredProjects', projectId);
        await deleteDoc(projectRef);
        // Revalidate the homepage to remove the project immediately
        revalidatePath('/');
        revalidatePath('/admin/featured-work');
    } catch (error) {
        console.error("Error deleting featured project: ", error);
        throw new Error("Could not delete project. Check permissions.");
    }
}
