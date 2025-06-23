
'use server';

import { db, doc, updateDoc, arrayUnion, arrayRemove } from '@/lib/firebase/client';
import { revalidatePath } from 'next/cache';

/**
 * Updates a user's admin status in the central Firestore config document.
 * This action relies on Firestore security rules to ensure that only an
 * existing admin can successfully execute this operation.
 * @param userId The UID of the user to modify.
 * @param makeAdmin True to grant admin rights, false to revoke.
 */
export async function updateAdminStatus(userId: string, makeAdmin: boolean) {
  const adminDocRef = doc(db, 'config', 'admins');

  try {
    if (makeAdmin) {
      await updateDoc(adminDocRef, {
        uids: arrayUnion(userId)
      });
    } else {
      await updateDoc(adminDocRef, {
        uids: arrayRemove(userId)
      });
    }
    // Revalidate the users page to reflect changes
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating admin status:", error);
    // The security rule message will be the most informative
    return { success: false, error: error.message };
  }
}
