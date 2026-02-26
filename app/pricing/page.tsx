'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Pricing() {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan)

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push('/register')
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-20">
      
      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Wybierz plan dla siebie
        </h1>
        <p className="text-lg text-gray-600">
          Generuj profesjonalne ebooki AI bez limitów technicznych.
        </p>
      </div>

      {/* PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* ===== PODSTAWOWY ===== */}
        <div className="bg-white w-full max-w-sm mx-auto p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Podstawowy</h2>
            <p className="text-4xl font-bold mb-6">29 zł</p>
          </div>

          <ul className="space-y-3 text-gray-600 mb-8 text-sm">
            <li>5 ebooków miesięcznie</li>
            <li>Format DOCX</li>
            <li>Bez eksportu PDF</li>
            <li>Bez generowania okładki</li>
          </ul>

          <button
            onClick={() => handleCheckout('Podstawowy')}
            disabled={loadingPlan === 'Podstawowy'}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loadingPlan === 'Podstawowy'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PREMIUM (WYRÓŻNIONY) ===== */}
        <div className="relative bg-white w-full max-w-sm mx-auto p-8 rounded-2xl border-2 border-black shadow-lg flex flex-col">
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-black text-white text-xs px-4 py-1 rounded-full">
              Najczęściej wybierany
            </span>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Premium</h2>
            <p className="text-4xl font-bold mb-6">59 zł</p>
          </div>

          <ul className="space-y-3 text-gray-700 mb-8 text-sm">
            <li>15 ebooków miesięcznie</li>
            <li>Format PDF + DOCX</li>
            <li>Automatyczna okładka</li>
            <li>Wyższa jakość generowania</li>
          </ul>

          <button
            onClick={() => handleCheckout('Premium')}
            disabled={loadingPlan === 'Premium'}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loadingPlan === 'Premium'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

        {/* ===== PRO+ ===== */}
        <div className="bg-white w-full max-w-sm mx-auto p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Pro+</h2>
            <p className="text-4xl font-bold mb-6">99 zł</p>
          </div>

          <ul className="space-y-3 text-gray-600 mb-8 text-sm">
            <li>30 ebooków miesięcznie</li>
            <li>Format PDF + DOCX</li>
            <li>Automatyczna okładka</li>
            <li>Najwyższa jakość generowania</li>
          </ul>

          <button
            onClick={() => handleCheckout('Pro+')}
            disabled={loadingPlan === 'Pro+'}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loadingPlan === 'Pro+'
              ? 'Przekierowanie...'
              : 'Kup plan'}
          </button>
        </div>

      </div>

      {/* BACK LINK */}
      <div className="text-center mt-16">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-gray-500 hover:text-black transition underline"
        >
          Wróć do panelu
        </button>
      </div>

    </div>
  )
}