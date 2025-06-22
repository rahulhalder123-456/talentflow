
'use server';

import { revalidatePath } from 'next/cache';
import { db, doc, updateDoc } from '@/lib/firebase/client';
import type { Project } from './types';


/**
 * Revalidates the cache for the dashboard and projects pages.
 * This is called after a new project is created to ensure the UI updates.
 */
export async function revalidateProjectPaths() {
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');
    revalidatePath('/admin/projects');
}


/**
 * Updates the status of a project in Firestore.
 * In a real app, this would be part of a larger payment processing flow.
 * @param projectId The ID of the project to update.
 * @param newStatus The new status for the project.
 */
export async function updateProjectStatus(
    projectId: string, 
    newStatus: Project['status']
): Promise<{ success: boolean; error?: string }> {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, {
            status: newStatus,
        });

        // After successful update, revalidate all relevant paths
        revalidatePath('/dashboard/projects');
        revalidatePath(`/projects/${projectId}`);
        revalidatePath('/admin/projects');
        
        return { success: true };
    } catch (error) {
        console.error("Error updating project status:", error);
        // In a real app, you might want more specific error handling
        return { success: false, error: "Failed to update project status." };
    }
}
