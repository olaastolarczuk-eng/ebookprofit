'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Pricing() {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    try {
      setLoadingPlan(plan)

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      if (!res.ok) {
        throw new Error('Błąd tworzenia sesji Stripe')
      }

      const data = await res.json()

      // 🔥 Przekierowanie do Stripe
      window.location.href = data.url

    } catch (error) {
      alert('Nie udało się rozpocząć płatności.')
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-10">
        Wybierz plan
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        {/* ===== PLAN PODSTAWOWY ===== */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">
            Plan Podstawowy
          </h2>

          <p className="text-3xl font-bold mb-4">
            29 zł
          </p>

          <p className="mb-6 text-gray-600">
            5 ebooków miesięcznie <br />
            Format: DOCX <br />
            Bez PDF <br />
            Bez okładki
          </p>

          <button
            onClick={() => handleCheckout('Podstawowy')}
            disabled={loadingPlan === 'Podstawowy'}
            className="bg-black text-white px-6 py-2 rounded w-full"
          >
            {loadingPlan === 'Podstawowy'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PLAN PREMIUM ===== */}
        <div className="bg-white p-6 rounded shadow border-2 border-black scale-105">
          <h2 className="text-xl font-bold mb-2">
            Plan Premium
          </h2>

          <p className="text-3xl font-bold mb-4">
            59 zł
          </p>

          <p className="mb-6 text-gray-600">
            15 ebooków miesięcznie <br />
            Format: PDF + DOCX <br />
            Automatyczna okładka <br />
            Priorytetowa jakość generowania
          </p>

          <button
            onClick={() => handleCheckout('Premium')}
            disabled={loadingPlan === 'Premium'}
            className="bg-black text-white px-6 py-2 rounded w-full"
          >
            {loadingPlan === 'Premium'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PLAN PRO+ ===== */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">
            Plan Pro+
          </h2>

          <p className="text-3xl font-bold mb-4">
            99 zł
          </p>

          <p className="mb-6 text-gray-600">
            Nielimitowana liczba ebooków <br />
            Format: PDF + DOCX <br />
            Automatyczna okładka <br />
            Najwyższa jakość generowania
          </p>

          <button
            onClick={() => handleCheckout('Pro+')}
            disabled={loadingPlan === 'Pro+'}
            className="bg-black text-white px-6 py-2 rounded w-full"
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
