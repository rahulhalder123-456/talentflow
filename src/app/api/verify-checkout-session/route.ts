
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { db, doc, updateDoc, getDoc } from '@/lib/firebase/client';
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
    const { session_id } = await request.json();

    if (!session_id) {
        return NextResponse.json({ success: false, error: 'Session ID is required.' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            const projectId = session.metadata?.projectId;
            const paymentAmount = Number(session.metadata?.paymentAmount);

            if (!projectId || isNaN(paymentAmount)) {
                 return NextResponse.json({ success: false, error: 'Session metadata is missing or invalid.' }, { status: 400 });
            }
            
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

            revalidatePath('/dashboard/projects');
            revalidatePath(`/projects/${projectId}`);
            revalidatePath('/admin/projects');

            return NextResponse.json({ success: true, message: 'Payment verified and project updated.' });
        } else {
            return NextResponse.json({ success: false, error: 'Payment not successful.' });
        }

    } catch (error) {
        console.error("Error verifying Stripe session:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not verify session";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
