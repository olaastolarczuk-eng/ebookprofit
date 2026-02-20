'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    alert('Błąd rejestracji: ' + error.message)
    return
  }

  // jeśli użytkownik został utworzony
  if (data.user) {
    await supabase.from('profiles').insert({
  id: data.user.id,
  email,
  plan: 'Brak',
})

  }

  alert('Rejestracja udana!')
  router.push('/dashboard')
}

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold">Rejestracja</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Hasło"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-black text-white p-2"
      >
        Zarejestruj się
      </button>
    </div>
  )
}
