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

      {/* ===== NAVBAR ===== */}
<nav className="flex justify-between items-center py-6 px-6 md:px-12 sticky top-0 bg-black/70 backdrop-blur z-50">
  
  {/* Logo */}
  <div
    onClick={() => router.push('/')}
    className="text-xl font-bold text-white cursor-pointer"
  >
    EbookProfit
  </div>

  {/* Przyciski */}
  <div className="space-x-4">
    <button
      onClick={() => router.push('/login')}
      className="text-gray-300 hover:text-white transition"
    >
      Logowanie
    </button>

    <button
      onClick={() => router.push('/register')}
      className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-white transition"
    >
      Rejestracja
    </button>
  </div>
</nav>

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">

        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full top-[-200px]"></div>

        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mb-6 leading-tight">
  Zamień swoją wiedzę w gotowy ebook
  <span className="block text-purple-400">
    w mniej niż 10 minut 🚀
  </span>
</h1>

        <p className="text-lg text-gray-400 max-w-xl mb-8">
  Generuj treść, strukturę i okładkę automatycznie.
  Bez pisania. Bez grafika. Bez tygodni pracy.
</p>

        <button
          onClick={handleStart}
          className="bg-purple-600 hover:bg-purple-500 transition px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
          Zacznij tworzyć swój ebook
        </button>
      </section>
      <section className="py-20 px-6 text-center bg-black">
  <h2 className="text-3xl font-bold mb-8">
    Pisanie ebooka to tygodnie pracy…
  </h2>

  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
    Brak czasu. Brak struktury. Brak okładki.
    A i tak nie masz pewności, czy się sprzeda.
  </p>

  <h3 className="text-2xl font-semibold text-purple-400">
    Z EbookProfit robisz to w kilka minut.
  </h3>
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
      {/* ===== LICZNIK ===== */}
<section className="py-24 text-center bg-black">
  <h2 className="text-5xl font-bold text-purple-400 mb-4">
    1 284+
  </h2>
  <p className="text-gray-400 text-lg">
    Wygenerowanych ebooków przez naszych użytkowników
  </p>

  <div className="mt-6 text-yellow-400 text-xl">
    ★★★★★ <span className="text-white ml-2">5.0 średnia ocena</span>
  </div>
</section>

      {/* ===== DLACZEGO MY ===== */}
<section className="py-28 px-6 bg-black text-center">
  <h2 className="text-4xl font-bold mb-16">
    Dlaczego EbookProfit?
  </h2>

  <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        🧠 Inteligentna struktura treści
      </h3>
      <p className="text-gray-400">
        AI tworzy logiczne rozdziały, nagłówki i uporządkowaną treść —
        nie jest to przypadkowy tekst.
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        💰 Gotowe do sprzedaży
      </h3>
      <p className="text-gray-400">
        Otrzymujesz plik PDF z okładką, który możesz od razu sprzedawać
        na swojej stronie lub w social media.
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        🚀 Skalowalność
      </h3>
      <p className="text-gray-400">
        Twórz wiele ebooków miesięcznie i buduj własną bibliotekę produktów cyfrowych.
      </p>
    </div>

  </div>
</section>
{/* ===== MOCKUP MACBOOK ===== */}
<section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-center relative overflow-hidden">

  <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2 animate-pulse"></div>

  <h2 className="text-4xl font-bold mb-16 relative z-10">
    Zobacz jak wygląda dashboard
  </h2>

  <div className="relative max-w-5xl mx-auto z-10">

    {/* GÓRNA RAMKA */}
    <div className="bg-gray-800 rounded-t-2xl h-8 flex items-center px-4 space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
    </div>

    {/* EKRAN */}
    <div className="bg-black rounded-b-2xl shadow-2xl border border-white/10 overflow-hidden hover-glow transition duration-500">

      <img
        src="/dashboard-preview.png"
        alt="Dashboard preview"
        className="w-full object-cover"
      />

    </div>

  </div>

</section>

{/* ===== PORÓWNANIE ===== */}
<section className="py-28 px-6 bg-black text-center">
  <h2 className="text-4xl font-bold mb-16">
    Dlaczego to lepsze niż pisanie ręczne?
  </h2>

  <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 text-left">

    <div className="bg-red-500/10 p-8 rounded-2xl border border-red-500/20">
      <h3 className="text-xl font-semibold mb-4 text-red-400">
        Pisanie samodzielne
      </h3>
      <ul className="text-gray-400 space-y-2">
        <li>❌ Tygodnie pracy</li>
        <li>❌ Brak struktury</li>
        <li>❌ Projektowanie okładki osobno</li>
        <li>❌ Koszt grafika</li>
      </ul>
    </div>

    <div className="bg-green-500/10 p-8 rounded-2xl border border-green-500/20">
      <h3 className="text-xl font-semibold mb-4 text-green-400">
        EbookProfit
      </h3>
      <ul className="text-gray-400 space-y-2">
        <li>✔ Ebook w kilka minut</li>
        <li>✔ Automatyczna struktura</li>
        <li>✔ Okładka generowana AI</li>
        <li>✔ Gotowy PDF do sprzedaży</li>
      </ul>
    </div>

  </div>
</section>

<section className="py-24 px-6 bg-black text-center">
  <h2 className="text-4xl font-bold mb-16">
    Dla kogo jest EbookProfit?
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        👩‍🏫 Trenerzy i eksperci
      </h3>
      <p className="text-gray-400">
        Zamień wiedzę w produkt cyfrowy i sprzedawaj ją online.
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        📱 Twórcy internetowi
      </h3>
      <p className="text-gray-400">
        Stwórz własny ebook jako dodatek do kursu lub lead magnet.
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">
        💼 Przedsiębiorcy
      </h3>
      <p className="text-gray-400">
        Buduj markę eksperta bez zatrudniania copywritera.
      </p>
    </div>

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
            <p className="text-sm opacity-70 mb-4">
  Jednorazowa płatność
</p>

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
            <p className="text-sm opacity-70 mb-4">
  Jednorazowa płatność
</p>

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
            <p className="text-sm opacity-70 mb-4">
  Jednorazowa płatność
</p>

            <p className="text-gray-400 mb-6">
              30 ebooków miesięcznie<br />
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
      {/* ===== BEZPIECZEŃSTWO ===== */}
<section className="py-20 px-6 bg-gray-950 text-center">
  <h2 className="text-3xl font-bold mb-8">
    Bezpieczne płatności
  </h2>

  <p className="text-gray-400 max-w-2xl mx-auto">
    Wszystkie płatności obsługiwane są przez Stripe.
    Dane kart są szyfrowane i nigdy nie trafiają na nasze serwery.
  </p>

  <div className="mt-8 text-gray-500">
    🔒 SSL • Stripe • Bezpieczne transakcje
  </div>
</section>

      {/* ===== OPINIE ===== */}
<section className="py-28 px-6 bg-gray-950 text-center">
  <h2 className="text-4xl font-bold mb-16">
    Co mówią użytkownicy?
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur">
      <p className="text-gray-300 mb-6">
        „Wygenerowałam ebooka i sprzedałam go w ciągu 48 godzin.
        To narzędzie zmieniło mój biznes.”
      </p>
      <p className="text-purple-400 font-semibold">
        Anna, trenerka online
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur">
      <p className="text-gray-300 mb-6">
        „Oszczędziłem tygodnie pracy. AI zrobiło to szybciej i lepiej
        niż się spodziewałem.”
      </p>
      <p className="text-purple-400 font-semibold">
        Michał, konsultant biznesowy
      </p>
    </div>

    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur">
      <p className="text-gray-300 mb-6">
        „Najlepsze narzędzie do tworzenia produktów cyfrowych,
        jakie testowałam.”
      </p>
      <p className="text-purple-400 font-semibold">
        Karolina, twórczyni kursów
      </p>
    </div>

  </div>
</section>

<section className="py-24 px-6 bg-gray-950 text-center">
  <h2 className="text-4xl font-bold mb-12">
    Najczęstsze pytania
  </h2>

  <div className="max-w-3xl mx-auto text-left space-y-6">

    <div>
      <h3 className="font-semibold mb-2">
        Czy to jest abonament?
      </h3>
      <p className="text-gray-400">
        Nie. Każdy plan to jednorazowa płatność.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2">
        Czy mogę sprzedawać wygenerowane ebooki?
      </h3>
      <p className="text-gray-400">
        Tak. Masz pełne prawa do wygenerowanej treści.
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-2">
        Czy potrzebuję wiedzy technicznej?
      </h3>
      <p className="text-gray-400">
        Nie. Wystarczy wpisać temat i kliknąć generuj.
      </p>
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

    
<footer className="text-sm text-gray-500 flex gap-6 justify-center mt-10 mb-6">

<a href="/privacy">Polityka prywatności</a>

<a href="/terms">Regulamin</a>

<a href="/cookies">Cookies</a>

<a href="/ai">AI</a>

</footer>
</main>
  )
}


