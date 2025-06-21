
'use server';

import { db, collection, query, getDocs } from '@/lib/firebase/client';

// A helper to provide more specific error messages
function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('PERMISSION_DENIED')) {
      if (error.message.includes('Cloud Firestore API has not been used')) {
        return 'Firestore API is not enabled for this project. Please enable it in the Google Cloud Console and try again.';
      }
      return 'Permission Denied. Your Firestore security rules are blocking this action. Go to the Firebase Console > Firestore > Rules and update them.';
    }
    return error.message;
  }
  return 'An unknown error occurred.';
}

export async function getAllChats() {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef);
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            lastMessageAt: data.lastMessageAt?.toDate().toISOString() || new Date().toISOString(),
        }
    });
    return { success: true, chats };
  } catch (error) {
    console.error('Error fetching all chats:', error);
    return { success: false, error: getFirebaseErrorMessage(error), chats: [] };
  }
}
