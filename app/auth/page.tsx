'use client'

import React, { useState } from 'react'
// Jeśli nie używasz aliasu, zmień ścieżkę na względną
import { supabase } from '../../lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Sprawdź swój email, aby potwierdzić konto')
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Zalogowano pomyślnie!')
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">EbookProfit – Logowanie / Rejestracja</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Zaloguj
        </button>
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Zarejestruj
        </button>
      </div>
      {message && <p className="text-center text-red-500">{message}</p>}
    </main>
  )
}