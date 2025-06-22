
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

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const options = {
    amount: Number(amount) * 100, // amount in the smallest currency unit (paise)
    currency,
    receipt: `receipt_order_${new Date().getTime()}`,
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
