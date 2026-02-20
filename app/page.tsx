'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleStart = () => {
    if (!user) {
      router.push('/login')
    } else {
      router.push('/dashboard')
    }
  }

  if (loading) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-6">
        Twórz profesjonalne eBooki w kilka minut 🚀
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Generator AI, który tworzy gotowe ebooki z okładką i eksportem do PDF.
      </p>

      <button
  onClick={() => router.push('/dashboard')}
>
  Zacznij generować
</button>

    </main>
  )
}
