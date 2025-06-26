
import { NextResponse, type NextRequest } from "next/server";
import crypto from 'crypto';
import { db, doc, updateDoc, getDoc } from '@/lib/firebase/client';
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId, paymentAmount } = await request.json();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
        return NextResponse.json({ success: false, error: 'Razorpay secret is not configured.' }, { status: 500 });
    }
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !projectId || isNaN(paymentAmount)) {
        return NextResponse.json({ success: false, error: 'Missing required payment data.' }, { status: 400 });
    }

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', keySecret).update(body.toString()).digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Signature is valid, update the project in Firestore
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

            if (newAmountPaid >= totalBudget) {
                updates.status = 'Closed';
            } else if (projectData.status === 'Open') {
                updates.status = 'In Progress';
            }

            await updateDoc(projectRef, updates);

            // Revalidate paths to show updated status immediately
            revalidatePath('/dashboard/projects');
            revalidatePath(`/projects/${projectId}`);
            revalidatePath('/admin/projects');

            return NextResponse.json({ success: true, message: 'Payment verified and project updated.' });
        } else {
             return NextResponse.json({ success: false, error: 'Invalid signature.' }, { status: 400 });
        }

    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not verify payment";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
