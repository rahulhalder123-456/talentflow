
'use server';

// This file is intentionally left blank.
// The chat fetching logic has been moved to the client-side component
// `AllChatsList.tsx` to ensure proper authentication context is passed
// to Firestore, resolving the "Permission Denied" errors that occur
// when fetching data from a server action without auth context.
