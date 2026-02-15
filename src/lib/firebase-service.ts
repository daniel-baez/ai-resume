import { adminDb } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
  sent_at: FieldValue | null;
  created_at: FieldValue;
}

export const saveContactMessage = async (data: Omit<ContactMessage, 'sent_at' | 'created_at'>) => {
  try {
    const docRef = await adminDb.collection('contact_messages').add({
      ...data,
      sent_at: null,
      created_at: FieldValue.serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
};

export const updateMessageSentStatus = async (messageId: string) => {
  try {
    await adminDb.collection('contact_messages').doc(messageId).update({
      sent_at: FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating message sent status:', error);
    throw error;
  }
}; 