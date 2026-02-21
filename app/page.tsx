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
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50">
        <h1 className="text-5xl font-bold max-w-3xl mb-6 leading-tight">
          Twórz profesjonalne eBooki w kilka minut z pomocą AI 🚀
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Generuj gotowe ebooki z okładką i eksportem do PDF.
          Idealne dla twórców, ekspertów i przedsiębiorców.
        </p>

        <button
          onClick={handleStart}
          className="bg-black text-white px-8 py-4 rounded text-lg hover:opacity-90 transition"
        >
          Zacznij generować
        </button>
      </section>

      {/* PROBLEM / ROZWIĄZANIE */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Tworzenie ebooka zajmuje tygodnie…
          </h2>
          <p className="text-gray-600">
            Pisanie, formatowanie, projektowanie okładki, skład PDF —
            to wszystko zabiera ogrom czasu.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            My robimy to w kilka minut.
          </h2>
          <p className="text-gray-600">
            Podajesz temat. Wybierasz styl. Klikasz generuj.
            Gotowy ebook trafia do Ciebie automatycznie.
          </p>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="py-20 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold mb-12">
          Jak to działa?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-3">1️⃣ Wpisz temat</h3>
            <p className="text-gray-600">
              Podaj temat swojego ebooka.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2️⃣ Wybierz styl</h3>
            <p className="text-gray-600">
              Minimal, biznes, kurs, luxury.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3️⃣ Pobierz gotowy PDF</h3>
            <p className="text-gray-600">
              Ebook z okładką gotowy do sprzedaży.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Gotowa/wy, by stworzyć swój pierwszy ebook?
        </h2>

        <button
          onClick={() => router.push('/pricing')}
          className="bg-black text-white px-8 py-4 rounded text-lg hover:opacity-90 transition"
        >
          Wybierz plan
        </button>
      </section>

    </main>
  )
}
