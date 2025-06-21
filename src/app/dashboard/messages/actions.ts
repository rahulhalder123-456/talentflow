
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
      return 'Permission Denied. Your Firestore security rules are blocking this action.';
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
        participants: [userId, 'support-admin'] // Assuming a support chat
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}
