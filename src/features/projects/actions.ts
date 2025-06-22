
'use server';

import { revalidatePath } from 'next/cache';

/**
 * Revalidates the cache for the dashboard and projects pages after creation.
 */
export async function revalidateProjectPaths() {
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');
    revalidatePath('/admin/projects');
}

/**
 * Revalidates a specific project page and its related list views after a status update.
 * This is intended to be called from the client after a successful database write.
 * @param projectId The ID of the project to update.
 */
export async function revalidateOnStatusUpdate(
    projectId: string, 
): Promise<{ success: boolean; error?: string }> {
    try {
        revalidatePath('/dashboard/projects');
        revalidatePath(`/projects/${projectId}`);
        revalidatePath('/admin/projects');
        return { success: true };
    } catch (error) {
        console.error("Error revalidating paths:", error);
        return { success: false, error: "Failed to revalidate project status." };
    }
}
