import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
  sent_at: Timestamp | null;
  created_at: Timestamp;
}

export const saveContactMessage = async (data: Omit<ContactMessage, 'sent_at' | 'created_at'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      sent_at: null,
      created_at: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
};

export const updateMessageSentStatus = async (messageId: string) => {
  try {
    const messageRef = doc(db, 'contact_messages', messageId);
    await updateDoc(messageRef, {
      sent_at: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating message sent status:', error);
    throw error;
  }
}; 