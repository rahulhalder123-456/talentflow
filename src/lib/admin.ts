
import { db, doc, getDoc } from '@/lib/firebase/client';

// Use a simple client-side cache to avoid repeated lookups within a short time.
let adminUidsCache: string[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION_MS = 60 * 1000; // 1 minute

// --- BOOTSTRAP FIRST ADMIN ---
// If the 'config/admins' document doesn't exist in Firestore, this UID will be
// automatically granted admin privileges to bootstrap the system.
// Once an admin is set via the UI, this fallback is no longer used.
const FALLBACK_ADMIN_UID = 'ToBDMq0KVIgnLQCEeFzxLzB4HUj1';

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
        } else {
             // If the document doesn't exist, use the fallback UID to bootstrap the first admin.
            console.warn(`Admin config document not found. Using fallback UID to bootstrap the first admin. Please set an admin in the UI to create the document.`);
            return [FALLBACK_ADMIN_UID];
        }

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
