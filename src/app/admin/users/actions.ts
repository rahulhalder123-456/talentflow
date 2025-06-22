
'use server';

// This file is intentionally left blank.
// The user fetching logic has been moved to the client-side component
// `AllUsersList.tsx` to ensure proper authentication context is passed
// to Firestore, resolving the "Permission Denied" errors that occur
// when fetching data from a server action without auth context.

