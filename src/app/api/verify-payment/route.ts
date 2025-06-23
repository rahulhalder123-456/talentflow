
import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { db, doc, updateDoc, getDoc } from '@/lib/firebase/client';
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId, paymentAmount } =
    await request.json();
    
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !projectId || !paymentAmount) {
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
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
            return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
        }

        const projectData = projectSnap.data();
        const currentAmountPaid = projectData.amountPaid || 0;
        const newAmountPaid = currentAmountPaid + paymentAmount;
        const totalBudget = parseFloat(projectData.budget);
        
        const updates: { amountPaid: number, status?: string } = {
            amountPaid: newAmountPaid
        };

        // If the new amount paid meets or exceeds the budget, close the project.
        if (newAmountPaid >= totalBudget) {
            updates.status = 'Closed';
        }
        // Otherwise, if the project was just started, move it to "In Progress".
        else if (projectData.status === 'Open') {
            updates.status = 'In Progress';
        }

        await updateDoc(projectRef, updates);

        // Revalidate paths to show updated status
        revalidatePath('/dashboard/projects');
        revalidatePath(`/projects/${projectId}`);
        revalidatePath('/admin/projects');

        return NextResponse.json({ success: true, newAmountPaid, newStatus: updates.status || projectData.status });
    } catch(error) {
        console.error("Error updating project status in DB:", error);
        return NextResponse.json({ success: false, error: 'Failed to update project status.' }, { status: 500 });
    }
  } else {
    // Payment is not authentic
    return NextResponse.json({ success: false, error: "Invalid payment signature." }, { status: 400 });
  }
}
