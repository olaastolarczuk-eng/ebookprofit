'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
const selectedPlan = searchParams.get('plan')
  

  const handleRegister = async () => {
    setErrorMsg('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: selectedPlan
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/login?plan=${selectedPlan}`
  : `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      },
    })

    if (error) {
      setErrorMsg(error.message)
      return
    }

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        plan: 'Brak',
      })
    }

    // 🔥 ZAMIENIAMY alert + redirect
    setEmailSent(true)
  }

  // ===== EKRAN PO REJESTRACJI =====
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="bg-white/5 p-10 rounded-2xl max-w-md text-center border border-white/10">

          <div className="text-5xl mb-6">📩</div>

          <h2 className="text-2xl font-bold mb-4">
            Sprawdź swoją skrzynkę mailową
          </h2>

          <p className="text-gray-400 mb-6">
            Wysłaliśmy link aktywacyjny na:
            <br />
            <span className="text-purple-400 font-semibold">
              {email}
            </span>
          </p>

          <p className="text-gray-500 text-sm mb-6">
            Kliknij link w mailu, aby aktywować konto.
            Jeśli nie widzisz wiadomości, sprawdź folder SPAM.
          </p>

          <a
            href="https://mail.google.com"
            target="_blank"
            className="inline-block bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold transition"
          >
            Otwórz Gmail
          </a>
        </div>
      </div>
    )
  }

  // ===== FORMULARZ =====
  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20 px-6">
      <h1 className="text-2xl font-bold text-center">
        Rejestracja
      </h1>

      {errorMsg && (
        <div className="text-red-500 text-sm">
          {errorMsg}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Hasło"
        className="border p-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-black text-white p-3 rounded hover:bg-gray-800 transition"
      >
        Zarejestruj się
      </button>
    </div>
  )
}
