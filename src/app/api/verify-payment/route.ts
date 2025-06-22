import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { db } from '@/lib/firebase/client';
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId } = await request.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !projectId) {
    return NextResponse.json({ success: false, error: 'Missing payment details.' }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ success: false, error: 'Missing Razorpay secret.' }, { status: 500 });
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { status: 'In Progress' });

      revalidatePath('/dashboard/projects');
      revalidatePath(`/projects/${projectId}`);
      revalidatePath('/admin/projects');

      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Error updating Firestore:", err);
      return NextResponse.json({ success: false, error: 'Database update failed.' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, error: 'Invalid payment signature.' }, { status: 400 });
  }
}