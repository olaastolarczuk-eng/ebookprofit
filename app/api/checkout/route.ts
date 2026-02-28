import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
})

export async function POST(req: Request) {
  const { plan, userId } = await req.json()

  const priceId =
    plan === 'Podstawowy'
      ? process.env.STRIPE_PRICE_BASIC
      : plan === 'Premium'
      ? process.env.STRIPE_PRICE_PREMIUM
      : process.env.STRIPE_PRICE_PRO

  if (!priceId) {
    return NextResponse.json(
      { error: 'Price ID not found' },
      { status: 400 }
    )
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: {
      userId,
      plan,
    },
  })

  return NextResponse.json({ url: session.url })
}