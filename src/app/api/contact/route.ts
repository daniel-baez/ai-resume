import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const docRef = await adminDb.collection('contact_messages').add({
      ...data,
      sent_at: null,
      created_at: new Date()
    });
    
    return Response.json({ id: docRef.id });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return Response.json({ error: 'Failed to save message' }, { status: 500 });
  }
} 