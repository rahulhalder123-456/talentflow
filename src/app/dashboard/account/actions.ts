
'use server';

// NOTE: All database operations have been moved to the client-side components
// (e.g., ProfileForm.tsx, PaymentsTab.tsx) to ensure they execute with the
// user's authentication context. A server action does not have access to the
// client's auth session by default, which causes "Missing or insufficient permissions"
// errors from Firestore when its security rules are properly configured.

export async function getUserProfile(userId: string) {
  // This is a placeholder function. The actual implementation is in ProfileForm.tsx
  console.warn("getUserProfile was called from a server action. This should be handled on the client.");
  return { success: false, error: 'This function is deprecated. Use client-side fetching.' };
}

// --- Payment Method Actions ---
// NOTE: These actions are now handled on the client-side in PaymentsTab.tsx
// to ensure they execute with the user's authentication context.
// A server action does not have access to the client's auth session by default,
// which causes "Missing or insufficient permissions" errors from Firestore.

export async function getPaymentMethods(userId: string) {
  if (!userId) return { success: false, error: 'User not authenticated.', methods: [] };
  // This is a placeholder. The actual implementation is in PaymentsTab.tsx
  console.warn("getPaymentMethods was called from a server action. This should be handled on the client.");
  return { success: true, methods: [] };
}
