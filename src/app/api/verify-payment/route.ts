
import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { db, doc, updateDoc } from '@/lib/firebase/client';
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId } =
    await request.json();
    
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !projectId) {
      return NextResponse.json({ success: false, error: 'Missing payment details.' }, { status: 400 });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keySecret) {
      console.error("Razorpay Key Secret is not set in environment variables.");
      return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Payment is authentic, update the database
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, {
            status: 'In Progress',
        });

        // Revalidate paths to show updated status
        revalidatePath('/dashboard/projects');
        revalidatePath(`/projects/${projectId}`);
        revalidatePath('/admin/projects');

        return NextResponse.json({ success: true });
    } catch(error) {
        console.error("Error updating project status in DB:", error);
        return NextResponse.json({ success: false, error: 'Failed to update project status.' }, { status: 500 });
    }
  } else {
    // Payment is not authentic
    return NextResponse.json({ success: false, error: "Invalid payment signature." }, { status: 400 });
  }
}
