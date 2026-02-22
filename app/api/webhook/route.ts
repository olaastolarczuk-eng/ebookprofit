import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // 🔥 TYLKO JEDEN BLOK
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const plan = session.metadata?.plan

    if (userId && plan) {
      await supabase
        .from('profiles')
        .update({
          plan,
          plan_expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        })
        .eq('id', userId)
    }
  }

  return NextResponse.json({ received: true })
}
