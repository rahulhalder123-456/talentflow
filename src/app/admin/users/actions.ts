
'use server';

import { revalidatePath } from 'next/cache';

/**
 * Revalidates the admin users page cache after a client-side update.
 */
export async function revalidateUsersPage() {
  revalidatePath('/admin/users');
}
