
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  const { amount, projectName, projectId, userId } = await request.json();

  if (!amount || !projectName || !projectId || !userId) {
    return NextResponse.json(
      { error: "Missing required session data" },
      { status: 400 }
    );
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("Stripe API keys are not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: Stripe API keys are not configured. Please check your .env.local file and restart the server." },
      { status: 500 }
    );
  }

  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: projectName,
              description: `Payment for project: ${projectId}`,
            },
            unit_amount: Math.round(amount * 100), // amount in paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/projects/${projectId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/projects/${projectId}`,
      metadata: {
        projectId,
        paymentAmount: amount, // store the original amount
      },
      client_reference_id: userId,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    const errorMessage = error instanceof Error ? error.message : "Could not create session";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
