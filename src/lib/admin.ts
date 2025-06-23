
import { db, doc, getDoc } from '@/lib/firebase/client';

// Use a simple client-side cache to avoid repeated lookups within a short time.
let adminUidsCache: string[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION_MS = 60 * 1000; // 1 minute

/**
 * Fetches the list of admin UIDs from the 'config/admins' document in Firestore.
 * Caches the result for 1 minute to reduce reads.
 */
export async function getAdminUids(): Promise<string[]> {
    const now = Date.now();
    if (adminUidsCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION_MS)) {
        return adminUidsCache;
    }

    try {
        const adminDocRef = doc(db, 'config', 'admins');
        const docSnap = await getDoc(adminDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            adminUidsCache = data.uids || [];
            cacheTimestamp = now;
            return adminUidsCache as string[];
        }
        console.warn("Admin config document not found in Firestore. See README for setup instructions. No users will have admin rights.");
        return [];
    } catch (error) {
        console.error("Error fetching admin UIDs from Firestore:", error);
        // In case of error, return empty to prevent accidental privilege grants
        return [];
    }
}

/**
 * Asynchronously checks if a user is an admin by checking their UID against
 * the list stored in Firestore.
 * @param userId The Firebase UID of the user to check.
 * @returns Promise<boolean> True if the user is an admin, false otherwise.
 */
export async function isAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) {
    return false;
  }
  const adminUids = await getAdminUids();
  return adminUids.includes(userId);
}
