import { NextResponse, type NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  const { amount, currency = "INR" } = await request.json();

  if (!amount) {
    return NextResponse.json(
      { error: "Amount is required" },
      { status: 400 }
    );
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error("Razorpay API keys are not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: Razorpay API keys are not configured. Please check your .env.local file and restart the server." },
      { status: 500 }
    );
  }

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  const options = {
    amount: Math.round(Number(amount) * 100),
    currency,
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 }
    );
  }
}