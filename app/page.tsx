'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    checkUser()
  }, [])

  const handleStart = () => {
    if (!user) {
      router.push('/pricing')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">

        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full top-[-200px]"></div>

        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mb-6 leading-tight animate-fadeIn">
          Twórz profesjonalne eBooki w kilka minut
          <span className="block text-purple-400">z pomocą AI 🚀</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mb-8">
          Generuj gotowe ebooki z okładką i eksportem do PDF.
          Sprzedawaj, buduj markę i skaluj wiedzę szybciej niż kiedykolwiek.
        </p>

        <button
          onClick={handleStart}
          className="bg-purple-600 hover:bg-purple-500 transition px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
          Zacznij generować
        </button>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-4">⚡ Ekspresowe generowanie</h3>
          <p className="text-gray-400">
            AI tworzy pełny ebook w kilka minut.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-4">🎨 Automatyczna okładka</h3>
          <p className="text-gray-400">
            Profesjonalny design bez grafika.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-4">📘 Eksport PDF i DOCX</h3>
          <p className="text-gray-400">
            Gotowy produkt do sprzedaży.
          </p>
        </div>

      </section>

      {/* ===== CENNIK ===== */}
      <section className="py-28 px-6 bg-gradient-to-b from-black to-gray-900 text-center">

        <h2 className="text-4xl font-bold mb-16">
          Wybierz plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Podstawowy */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500 transition">
            <h3 className="text-2xl font-semibold mb-4">Podstawowy</h3>
            <p className="text-4xl font-bold mb-6">29 zł</p>
            <p className="text-gray-400 mb-6">
              5 ebooków miesięcznie<br />
              Eksport DOCX
            </p>
            <button
              onClick={() => router.push('/pricing')}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold"
            >
              Wybierz
            </button>
          </div>

          {/* Premium */}
          <div className="bg-purple-600 p-8 rounded-2xl text-black shadow-2xl scale-105">
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-4xl font-bold mb-6">59 zł</p>
            <p className="mb-6">
              15 ebooków miesięcznie<br />
              PDF + Okładka
            </p>
            <button
              onClick={() => router.push('/pricing')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold"
            >
              Najczęściej wybierany
            </button>
          </div>

          {/* Pro+ */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500 transition">
            <h3 className="text-2xl font-semibold mb-4">Pro+</h3>
            <p className="text-4xl font-bold mb-6">99 zł</p>
            <p className="text-gray-400 mb-6">
              Nielimitowane ebooki<br />
              PDF + Okładka
            </p>
            <button
              onClick={() => router.push('/pricing')}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold"
            >
              Wybierz
            </button>
          </div>

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl font-bold mb-8">
          Gotowa/wy zacząć zarabiać na swoich ebookach?
        </h2>

        <button
          onClick={handleStart}
          className="bg-purple-600 hover:bg-purple-500 px-10 py-4 rounded-xl text-lg font-semibold transition"
        >
          Rozpocznij teraz
        </button>
      </section>

    </main>
  )
}
