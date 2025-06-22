
'use server';

import { revalidatePath } from 'next/cache';

/**
 * Revalidates the cache for the dashboard and projects pages.
 * This is called after a new project is created to ensure the UI updates.
 */
export async function revalidateProjectPaths() {
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/projects');
    revalidatePath('/admin/projects');
}
