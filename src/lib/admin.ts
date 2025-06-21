// 🔴 IMPORTANT: Replace with your actual Firebase User IDs (UIDs)
// You can find your UID after you sign into the app by checking the
// browser's developer console or your Firebase Authentication user list.
const ADMIN_UIDS = [
  'ToBDMq0KVIgnLQCEeFzxLzB4HUj1',
];

/**
 * Checks if a user is an administrator based on a hardcoded list of UIDs.
 * NOTE: This is a simple implementation for the prototype.
 * In a production app, you would likely manage roles in a database.
 * @param userId The Firebase UID of the user to check.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export function isAdmin(userId: string | undefined): boolean {
  if (!userId) {
    return false;
  }
  return ADMIN_UIDS.includes(userId);
}
