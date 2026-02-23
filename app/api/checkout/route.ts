import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { plan, userId } = await req.json()

  const priceMap: Record<string, string> = {
    Podstawowy: 'price_1T2cwXBKaFMW1zBpFXvGBqF9',
    Premium: 'price_1T2d0RBKaFMW1zBpFPzmYkzq',
    'Pro+': 'price_1T2d2sBKaFMW1zBpq0nSyX9b',
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',

    line_items: [
      {
        price: priceMap[plan],
        quantity: 1,
      },
    ],

    metadata: {
      userId: userId, // 🔥 KLUCZOWE
      plan: plan,
    },

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
