const stripe = require("stripe")(process.env.stripe_secret_key);
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const req_json = await req.json();
  const { products, email } = req_json;
  // create a new Checkout Session for the order
  const transformedItems = products.map((product: any) => {
    return {
      quantity: product.quantity,
      price_data: {
        currency: "inr",
        unit_amount: product.price * 100,
        product_data: {
          name: product.title,
          images: [product.image],
        },
      },
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `https://yasin-amazon-clone.vercel.app/success`,
    cancel_url: `https://yasin-amazon-clone.vercel.app/failed`,
    metadata: {
      email,
      images: JSON.stringify(products.map((product: any) => product.image)),
    },
  });

  return NextResponse.json({ success: true, id: session.id });
}
