import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const plan = session.metadata?.plan
    const email = session.customer_details?.email

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

    // 🔥 WYŚLIJ MAILA
    if (email && plan) {
      await resend.emails.send({
        from: 'EbookProfit <onboarding@resend.dev>',
        to: email,
        subject: 'Twoja płatność została potwierdzona 🎉',
        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Dziękujemy za zakup planu ${plan} 🚀</h2>
            <p>Twój plan został aktywowany.</p>
            <p>Możesz teraz generować ebooki w panelu.</p>
            <br />
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard"
               style="background: black; color: white; padding: 12px 20px; text-decoration: none;">
               Przejdź do panelu
            </a>
            <br /><br />
            <p>Pozdrawiamy,<br/>Zespół EbookProfit</p>
          </div>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}
