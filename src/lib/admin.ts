/**
 * -----------------------------------------------------------------------------
 * 🔴 ADMIN MANAGEMENT 🔴
 * -----------------------------------------------------------------------------
 * This file controls which users have administrative privileges in the app.
 * To add a new admin, you need to do two things:
 *
 * 1.  Find the new admin's Firebase User ID (UID).
 *     - Go to your Firebase Project > Authentication > Users tab.
 *     - Copy the UID for the user you want to make an admin.
 *
 * 2.  Add the UID to the `ADMIN_UIDS` array below.
 *     - Paste the new UID into the array, separated by a comma.
 *     - Example: ['uid-of-first-admin', 'uid-of-second-admin']
 *
 * 3.  Add the same UID to your `firestore.rules` file.
 *     - This is a CRITICAL step for database security.
 */

const ADMIN_UIDS = [
  'ToBDMq0KVIgnLQCEeFzxLzB4HUj1', // This is a placeholder for the initial admin
  // 'ADD_YOUR_NEW_ADMIN_UID_HERE',
];

/**
 * Checks if a user is an administrator based on the `ADMIN_UIDS` list.
 * This function is used on the client-side to control UI elements,
 * like showing the "Admin Dashboard" link.
 *
 * @param userId The Firebase UID of the user to check.
 * @returns {boolean} True if the user is an admin, false otherwise.
 */
export function isAdmin(userId: string | undefined): boolean {
  if (!userId) {
    return false;
  }
  return ADMIN_UIDS.includes(userId);
}
