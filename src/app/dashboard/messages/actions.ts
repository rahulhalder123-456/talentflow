
'use server';

import { z } from 'zod';
import { db, collection, addDoc, serverTimestamp, query, where, getDocs, doc, setDoc } from '@/lib/firebase/client';

const messageSchema = z.object({
  chatId: z.string(),
  userId: z.string(),
  text: z.string().optional(),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
});

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

export async function sendMessage(data: z.infer<typeof messageSchema>) {
  const parsedData = messageSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: "Invalid message data." };
  }

  const { chatId, userId, text, fileUrl, fileName } = parsedData.data;
  const clientUserId = chatId.replace('support_', '');

  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId: userId,
      text: text || null,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      createdAt: serverTimestamp(),
    });

    // Update the parent chat document with the last message time for sorting
    const chatRef = doc(db, 'chats', chatId);
    await setDoc(chatRef, { 
        lastMessageAt: serverTimestamp(),
        participants: [clientUserId, 'support-admin'] 
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
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
