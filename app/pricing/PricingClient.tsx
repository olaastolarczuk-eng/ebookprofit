'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PricingClient() {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const searchParams = useSearchParams()
const autoPlan = searchParams.get('plan')

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan)
  

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
  router.push(`/register?plan=${plan}`)
  return
}

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        plan,
        userId: data.user.id,
      }),
    })

    const result = await res.json()
window.location.href = result.url
  }
  useEffect(() => {
  if (autoPlan) {
    handleCheckout(autoPlan)
  }
}, [autoPlan])

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-gray-900 text-center">
      <h1 className="text-3xl font-bold mb-10">
        Wybierz plan
      </h1>

     <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto place-items-center">


        {/* ===== PLAN PODSTAWOWY ===== */}
        <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-2 text-black">Plan Podstawowy</h2>
          <p className="text-3xl font-bold mb-4 text-black">29 zł</p>

            <p className="mb-6 text-gray-800 max-w-xs">
  5 ebooków miesięcznie <br />
  Format: DOCX <br />
  Bez PDF <br />
  Bez okładki
</p>



          <button
            onClick={() => handleCheckout('Podstawowy')}
            disabled={loadingPlan === 'Podstawowy'}
            className="bg-black text-white px-6 py-2 rounded"

          >
            {loadingPlan === 'Podstawowy'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PLAN PREMIUM ===== */}
        <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-2">Plan Premium</h2>
          <p className="text-3xl font-bold mb-4 text-black">59 zł</p>

            <p className="mb-6 text-gray-800 max-w-xs">
            15 ebooków miesięcznie <br />
            Format: PDF + DOCX <br />
            Automatyczna okładka <br />
            Priorytetowa jakość generowania
          </p>

          <button
            onClick={() => handleCheckout('Premium')}
            disabled={loadingPlan === 'Premium'}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {loadingPlan === 'Premium'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PLAN PRO+ ===== */}
        <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-2">Plan Pro+</h2>
          <p className="text-3xl font-bold mb-4 text-black">99 zł</p>

            <p className="mb-6 text-gray-800 max-w-xs">
            30 ebooków miesięcznie <br />
            Format: PDF + DOCX <br />
            Automatyczna okładka <br />
            Najwyższa jakość generowania
          </p>

          <button
            onClick={() => handleCheckout('Pro+')}
            disabled={loadingPlan === 'Pro+'}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {loadingPlan === 'Pro+'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

      </div>

      <div className="mt-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-gray-500 underline"
        >
          Wróć do panelu
        </button>
      </div>
    </div>
  )
}

