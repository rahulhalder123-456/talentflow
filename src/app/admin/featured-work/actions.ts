
'use server';

import { revalidatePath } from 'next/cache';

// This server action is now only responsible for revalidating the cache
// after a project has been added or deleted on the client side.
// The database operations have been moved to the client components
// to ensure they run with the user's authentication context.
export async function revalidateFeaturedWorkPaths() {
    revalidatePath('/');
    revalidatePath('/admin/featured-work');
}
